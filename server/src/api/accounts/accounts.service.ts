import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetListDto } from './dto/get-list-dto';
import { UserService } from '../users/user.service';
import { User } from '../users/entity/user.entity';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private repos: Repository<Account>,
    private readonly userService: UserService,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return this.repos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async getListAccountByUserId(userId: number) {
    try {
      let user: User = await this.userService.getUserById(userId);

      

      if (user == null) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }
      const accounts = await this.repos.find({
        where: {
          customerId: userId,
        },
      });
      let data = {
        accounts: accounts || [],
      };
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi khi đang tìm kiếm các tài khoản!',
      );
    }
  }

  async getAccountInfoByAccountNumber (accountNumber: string) {

    try {
      let account : Account = await this.repos.findOne({
        where : {
          accountNumber
        }
      });
  
      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }
  
      let data = await this.repos.createQueryBuilder('account')
        .leftJoin('account.user', 'user')
        .select(['account.accountNumber', 'account.accountType','account.status', 'user.id', 'user.username', 'user.dob', 'user.phone', 'user.address', 'user.status', 'user.role'])
        .where('account.accountNumber =:accountNumber', {accountNumber})
        .getOne();

      return data;
  
    } catch (error) {
      throw new InternalServerErrorException('Lỗi trong quá trình lấy thông tin người dùng');
    }
    
    
    
  }
}
