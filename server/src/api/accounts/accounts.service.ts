import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

import { CreateAccountDto } from './dto/CreateAccountDto';
import { UpdateAccountDto } from './dto/UpdateAccountDto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { UserService } from '../users/user.service';
import { User } from '../users/entity/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private repos: Repository<Account>,
    private readonly userService: UserService,
  ) {}
  async create(dto: CreateAccountDto) {
    const accountNumber = randomstring.generate({
      length: 11,
      charset: 'numeric',
    });

    const account = await this.getByAccountNumber(accountNumber);

    if (!account) {
      return this.repos.save({ ...dto, accountNumber });
    } else {
      this.create(dto);
    }
  }

  getByAccountNumber(accountNumber: string) {
    return this.repos.findOneBy({ accountNumber });
  }

  getByCustomerId(customerId: number) {
    return this.repos.findOneBy({ customerId });
  }

  getOne(id: number) {
    return this.repos.findOneBy({ id });
  }

  findAll() {
    return this.repos.find();
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.getOne(id);

    if (!account) {
      throw new BadRequestException('Không tìm thấy account khi update');
    }

    return this.repos.update(id, updateAccountDto);
  }

  async depositByUsername(username: string, depositMoney: number) {
    const customerId = (await this.userService.getByUsername(username)).id;

    if (!customerId) {
      throw new BadRequestException(
        'Không tìm thấy user khi nạp tiền bằng username',
      );
    }

    const account = await this.getByCustomerId(customerId);

    if (!account) {
      throw new BadRequestException(
        'Không tìm thấy account khi nạp tiền bằng username',
      );
    }

    depositMoney += account.currentBalance;

    return this.repos.save({ ...account, currentBalance: depositMoney });
  }

  async depositByAccountNumber(accountNumber: string, depositMoney: number) {
    const account = await this.getByAccountNumber(accountNumber);

    if (!account) {
      throw new BadRequestException(
        'Không tìm thấy account khi nạp tiền bằng account number',
      );
    }

    depositMoney += account.currentBalance;

    return this.repos.save({ ...account, currentBalance: depositMoney });
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async getListAccountByUserId(userId: number) {
    try {
      const user: User = await this.userService.getUserById(userId);

      if (user == null) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }
      const accounts = await this.repos.find({
        where: {
          customerId: userId,
        },
      });
      const data = {
        accounts: accounts || [],
      };
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi khi đang tìm kiếm các tài khoản!',
      );
    }
  }

  async getAccountInfoByAccountNumber(accountNumber: string) {
    try {
      let account: Account = await this.repos.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.repos
        .createQueryBuilder('account')
        .leftJoin('account.user', 'user')
        .select([
          'account.accountNumber',
          'account.accountType',
          'account.status',
          'user.id',
          'user.username',
          'user.dob',
          'user.phone',
          'user.address',
          'user.status',
          'user.role',
        ])
        .where('account.accountNumber =:accountNumber', { accountNumber })
        .getOne();

      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy thông tin người dùng',
      );
    }
  }
}
