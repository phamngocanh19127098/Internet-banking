import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtRemindersService } from 'src/api/debtReminders/debtReminders.service';
import { DebtReminder } from 'src/api/debtReminders/entities/debtReminders.entity';
import { UserService } from 'src/api/users/user.service';
import { Repository } from 'typeorm';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { RemoveDebtReminderDto } from './dto/remove-debt-reminder.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';
import { BadRequestException, NotAcceptableException } from '@nestjs/common/exceptions';

@Injectable()
export class DebtReminderSocketService {
  constructor(
    @InjectRepository(DebtReminder)
    private readonly debtReminderRepository : Repository<DebtReminder>,
    private readonly debtReminderService : DebtRemindersService,
    private readonly userService: UserService,
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

  async removeCreatedDebtReminder(removeDebtReminderDto: RemoveDebtReminderDto) {
    
    const { userId, id } = removeDebtReminderDto;
    let user = await this.userService.getUserById(+userId);

    if (user == null) {
      throw new NotAcceptableException('Người dùng không tồn lại');
    }

    let debtReminder = await this.debtReminderRepository.findOne({
      where: {
        id: +id,
        userId: +userId
      }
    })    

    if (debtReminder == null) {
      throw new NotAcceptableException('Không tồn tại người giao dịch');
    }

    // await this.debtReminderRepository.delete(debtReminder);
    return debtReminder.receiverId;
  }

  async removeReceivedDebtReminder(removeDebtReminderDto: RemoveDebtReminderDto) {
    
    const { userId, id } = removeDebtReminderDto;
    let user = await this.userService.getUserById(+userId);

    if (user == null) {
      throw new NotAcceptableException('Người dùng không tồn lại');
    }

    let debtReminder = await this.debtReminderRepository.findOne({
      where: {
        id: +id,
        receiverId: +userId
      }
    })    

    if (debtReminder == null) {
      throw new NotAcceptableException('Không tồn tại lịch nhắc nợ');
    }

  
    return debtReminder.userId;
  }
}
