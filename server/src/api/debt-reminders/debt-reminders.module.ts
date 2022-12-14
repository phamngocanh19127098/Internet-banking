import { Module } from '@nestjs/common';
import { DebtRemindersService } from './debt-reminders.service';
import { DebtRemindersController } from './debt-reminders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DebtReminder} from "./entities/debt-reminder.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DebtReminder])],
  controllers: [DebtRemindersController],
  providers: [DebtRemindersService]
})
export class DebtRemindersModule {}
