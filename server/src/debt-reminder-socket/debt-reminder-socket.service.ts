import { Injectable } from '@nestjs/common';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';

@Injectable()
export class DebtReminderSocketService {
  create(createDebtReminderSocketDto: CreateDebtReminderSocketDto) {
    return 'This action adds a new debtReminderSocket';
  }

  findAll() {
    return `This action returns all debtReminderSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debtReminderSocket`;
  }

  update(id: number, updateDebtReminderSocketDto: UpdateDebtReminderSocketDto) {
    return `This action updates a #${id} debtReminderSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} debtReminderSocket`;
  }
}
