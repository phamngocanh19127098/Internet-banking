import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/api/users/user.module';
import { User } from 'src/api/users/entity/user.entity';
import { AuthModule } from 'src/api/auth/auth.module';
import { Transaction } from 'src/api/transactions/entities/transaction.entity';
import { TransactionsModule } from 'src/api/transactions/transactions.module';
import { AffiliatedBanksModule } from 'src/api/affiliatedBanks/affiliatedBanks.module';
import { AffiliatedBank } from 'src/api/affiliatedBanks/entities/affiliatedBank.entity';
import { AccountsModule } from 'src/api/accounts/accounts.module';
import { Account } from 'src/api/accounts/entities/account.entity';
import { DebtRemindersModule } from 'src/api/debtReminders/debtReminders.module';
import { DebtReminder } from 'src/api/debtReminders/entities/debtReminders.entity';
import { SavedBeneficiarysModule } from 'src/api/savedBeneficiarys/savedBeneficiarys.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SavedBeneficiary } from './api/savedBeneficiarys/entities/savedBeneficiary.entity';
import { DebtReminderSocketModule } from './debt-reminder-socket/debt-reminder-socket.module';
import {Otp} from "./api/otp/entities/otp.entity";
import {OtpModule} from "./api/otp/otp.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Transaction,
        AffiliatedBank,
        Account,
        DebtReminder,
        SavedBeneficiary,
        Otp
      ],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    TransactionsModule,
    AffiliatedBanksModule,
    AccountsModule,
    DebtRemindersModule,
    SavedBeneficiarysModule,
    DebtReminderSocketModule,
    OtpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
