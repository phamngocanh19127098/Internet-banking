import { Injectable } from '@nestjs/common';
import { CreateDebtReminderDto } from './dto/create-debt-reminder.dto';
import { UpdateDebtReminderDto } from './dto/update-debt-reminder.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DebtReminder} from "./entities/debtReminders.entity";

@Injectable()
export class DebtRemindersService {
  constructor(
      @InjectRepository(DebtReminder)
      private repos: Repository<DebtReminder>) {
  }
  create(createDebtReminderDto: CreateDebtReminderDto) {
    return 'This action adds a new debtReminder';
  }

  findAll() {
    return this.repos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} debtReminder`;
  }

  update(id: number, updateDebtReminderDto: UpdateDebtReminderDto) {
    return `This action updates a #${id} debtReminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtReminder`;
  }
}
