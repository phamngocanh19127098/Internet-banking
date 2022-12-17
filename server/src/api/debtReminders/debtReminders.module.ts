import { Module } from '@nestjs/common';
import { DebtRemindersService } from './debtReminders.service';
import { DebtRemindersController } from './debtReminders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DebtReminder} from "./entities/debtReminders.entity";
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DebtReminder]), UserModule],
  controllers: [DebtRemindersController],
  providers: [DebtRemindersService]
})
export class DebtRemindersModule {}
