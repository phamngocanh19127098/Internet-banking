import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {UserModule} from "../users/user.module";
import {JwtModule} from "@nestjs/jwt";
import {AccountsModule} from "../accounts/accounts.module";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),UserModule,JwtModule,AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
