import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {Transaction} from "./entities/transaction.entity";
import {Brackets, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "../accounts/entities/account.entity";

@Injectable()
export class TransactionsService {
  constructor(
      @InjectRepository(Transaction)
      private transactionResponsive: Repository<Transaction>,
      @InjectRepository(Account)
      private accountRepository: Repository<Account>
  ) {
  }
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return this.transactionResponsive.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async getTransactionByAccountNumber(
      accountNumber: string,
      transactionType: string,
  )
  {
    try {
      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber
        }
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionResponsive.createQueryBuilder('transaction')
          .leftJoin('transaction.accountDes', 'accountDes')
          .leftJoin('transaction.accountSrc', 'accountSrc')
          .select("transaction")
          .where('transaction.transactionType =:transactionType', {transactionType})
            .andWhere(new Brackets((qb) => {
              qb.where('accountDes.accountNumber =:accountNumber', {accountNumber})
              qb.orWhere('accountSrc.accountNumber =:accountNumber', {accountNumber})
            }))
          .orderBy("transaction.createdAt", "DESC")
          .getMany();

      return data;

    } catch (e) {
      throw new InternalServerErrorException('Lỗi trong quá trình lấy giao dịch người dùng');
    }
  }

}
