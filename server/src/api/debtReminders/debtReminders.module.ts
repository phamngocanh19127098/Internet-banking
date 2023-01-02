import { Module } from '@nestjs/common';
import { DebtRemindersService } from './debtReminders.service';
import { DebtRemindersController } from './debtReminders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DebtReminder} from "./entities/debtReminders.entity";
import { UserModule } from '../users/user.module';
import {TransactionsModule} from "../transactions/transactions.module";
import {AccountsModule} from "../accounts/accounts.module";

@Module({
  imports: [TypeOrmModule.forFeature([DebtReminder]), UserModule, AccountsModule, TransactionsModule],
  controllers: [DebtRemindersController],
  providers: [DebtRemindersService],
  exports: [DebtRemindersService]
})
export class DebtRemindersModule {}
