import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { DebtRemindersService } from 'src/api/debtReminders/debtReminders.service';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';
import { findAllCreatedDebtReminder,  findAllReceivedDebtReminder, removeCreatedDebtReminder, removeReceivedDebtReminder } from 'src/constant';
import { ListDebtReminderDto } from './dto/list-debt-reminder.dto';
import { RemoveDebtReminderDto } from './dto/remove-debt-reminder.dto';

@WebSocketGateway({cors: {
  origin: '*'
}})
export class DebtReminderSocketGateway {
  @WebSocketServer()
  server : Server;
  constructor(
    private readonly debtReminderSocketService: DebtReminderSocketService
  ) {}

  @SubscribeMessage('createDebtReminderSocket')
  create(@MessageBody() createDebtReminderSocketDto: CreateDebtReminderSocketDto) {
    return this.debtReminderSocketService.create(createDebtReminderSocketDto);
  }

  @SubscribeMessage(findAllCreatedDebtReminder)
  async findAllCreatedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    console.log(user);
    let data = await this.debtReminderSocketService.findAllCreatedDebtReminder(user.userId);
    return this.server.emit(findAllCreatedDebtReminder, data);
  }

  @SubscribeMessage(findAllReceivedDebtReminder)
  async findAllReceivedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    console.log(user);
    let data = await this.debtReminderSocketService.findAllReceivedDebtReminder(user.userId);
    return this.server.emit(findAllReceivedDebtReminder, data);
  }

  @SubscribeMessage(removeCreatedDebtReminder)
  async remove(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeCreatedDebtReminder(removeDebtReminderDto);
    this.server.emit(findAllReceivedDebtReminder, data);
    return this.server.emit(removeCreatedDebtReminder, {receiverId: data})
  }

  @SubscribeMessage(removeReceivedDebtReminder)
  async removeReceivedDebtReminder(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeReceivedDebtReminder(removeDebtReminderDto);
    this.server.emit(findAllReceivedDebtReminder, data);
    return this.server.emit(removeReceivedDebtReminder, {userId: data})
  }
}
