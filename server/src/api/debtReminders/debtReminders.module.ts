import { Module } from '@nestjs/common';
import { DebtRemindersService } from './debtReminders.service';
import { DebtRemindersController } from './debtReminders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DebtReminder} from "./entities/debtReminders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DebtReminder])],
  controllers: [DebtRemindersController],
  providers: [DebtRemindersService]
})
export class DebtRemindersModule {}
