import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {Repository} from "typeorm";
import {Account} from "./entities/account.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private repos: Repository<Account>,
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
}
