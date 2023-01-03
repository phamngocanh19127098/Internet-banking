import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { UserModule } from '../users/user.module';
import { AffiliatedBanksModule } from '../affiliatedBanks/affiliatedBanks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    UserModule,
    AffiliatedBanksModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
