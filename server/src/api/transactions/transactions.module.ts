import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {UserModule} from "../users/user.module";
import {JwtModule} from "@nestjs/jwt";
import {AccountsModule} from "../accounts/accounts.module";
import {Account} from "../accounts/entities/account.entity";
import {OtpModule} from "../otp/otp.module";
import {AffiliatedBanksModule} from "../affiliatedBanks/affiliatedBanks.module";
import {DebtReminder} from "../debtReminders/entities/debtReminders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, DebtReminder]),UserModule,JwtModule,AccountsModule,OtpModule,AffiliatedBanksModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
