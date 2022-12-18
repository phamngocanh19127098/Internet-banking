import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtRemindersService } from 'src/api/debtReminders/debtReminders.service';
import { DebtReminder } from 'src/api/debtReminders/entities/debtReminders.entity';
import { Repository } from 'typeorm';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';

@Injectable()
export class DebtReminderSocketService {
  constructor(
    @InjectRepository(DebtReminder)
    private readonly debtReminderRepository : Repository<DebtReminder>,
    private readonly debtReminderService : DebtRemindersService
  ){

  }
  create(createDebtReminderSocketDto: CreateDebtReminderSocketDto) {
    return 'This action adds a new debtReminderSocket';
  }

  async findAllCreatedDebtReminder(userId: string) {
    return this.debtReminderService.getDebtReminderCreated(+userId);
    // return `This action returns all debtReminderSocket`;
  }

  async findAllReceivedDebtReminder(userId: string) {
    return this.debtReminderService.getDebtReminderReceived(+userId);
    // return `This action returns all debtReminderSocket`;
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
