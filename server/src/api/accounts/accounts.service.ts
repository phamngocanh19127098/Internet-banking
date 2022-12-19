import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

import { CreateAccountDto } from './dto/CreateAccountDto';
import { UpdateAccountDto } from './dto/update-account.dto';
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

  findAll() {
    return this.repos.find();
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
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
