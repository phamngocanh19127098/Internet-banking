import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { DebtRemindersService } from 'src/api/debtReminders/debtReminders.service';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';
import { findAllCreatedDebtReminder,  findAllReceivedDebtReminder } from 'src/constant';
import { ListDebtReminderDto } from './dto/list-debt-reminder.dto';

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

  @SubscribeMessage('findOneDebtReminderSocket')
  findOne(@MessageBody() id: number) {
    return this.debtReminderSocketService.findOne(id);
  }

  @SubscribeMessage('updateDebtReminderSocket')
  update(@MessageBody() updateDebtReminderSocketDto: UpdateDebtReminderSocketDto) {
    return this.debtReminderSocketService.update(updateDebtReminderSocketDto.id, updateDebtReminderSocketDto);
  }

  @SubscribeMessage('removeDebtReminderSocket')
  remove(@MessageBody() id: number) {
    return this.debtReminderSocketService.remove(id);
  }
}
