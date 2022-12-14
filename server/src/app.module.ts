import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/api/users/user.module';
import { AuthModule } from 'src/api/auth/auth.module';
import { User } from 'src/api/users/entity/user.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Transaction} from "./api/transactions/entities/transaction.entity";
import {TransactionsModule} from "./api/transactions/transactions.module";
import {AffiliatedBanksModule} from "./api/affiliatedBanks/affiliatedBanks.module";
import {AffiliatedBank} from "./api/affiliatedBanks/entities/affiliatedBank.entity";
import {Account} from "./api/accounts/entities/account.entity";
import {AccountsModule} from "./api/accounts/accounts.module";
import {DebtReminder} from "./api/debtReminders/entities/debtReminders.entity";
import {DebtRemindersModule} from "./api/debtReminders/debtReminders.module";
import {SavedBeneficiarysModule} from "./api/savedBeneficiarys/savedBeneficiarys.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Transaction,AffiliatedBank, Account, DebtReminder, SavedBeneficiarysModule],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    TransactionsModule,
      AffiliatedBanksModule,
      AccountsModule,
      DebtRemindersModule,
      SavedBeneficiarysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
