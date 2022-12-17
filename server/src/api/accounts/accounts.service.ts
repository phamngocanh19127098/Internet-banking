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

  async getListAccountByUserId(userId: number, page: number, perPage: number) {
    try {
      let user: User = await this.userService.getUserById(userId);

      

      if (user == null) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }
      const [accounts, total] = await this.repos.findAndCount({
        where: {
          customerId: userId,
        },
        take: page || 1,
        skip: (page - 1) * perPage|| 10,
      });
      let data = {
        accounts: accounts || [],
        total,
      };
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi khi đang tìm kiếm các tài khoản!',
      );
    }
  }
}
