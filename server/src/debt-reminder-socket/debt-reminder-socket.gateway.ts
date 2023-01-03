import { UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { DebtRemindersService } from 'src/api/debtReminders/debtReminders.service';
import { DebtReminderSocketService } from './debt-reminder-socket.service';
import { CreateDebtReminderSocketDto } from './dto/create-debt-reminder-socket.dto';
import { UpdateDebtReminderSocketDto } from './dto/update-debt-reminder-socket.dto';
import {
  createDebtReminderSocket,
  findAllCreatedDebtReminder,
  findAllDebtReminder,
  findAllReceivedDebtReminder, findAllUnPaidDebtReminder,
  removeCreatedDebtReminder,
  removeReceivedDebtReminder
} from 'src/constant';
import { ListDebtReminderDto } from './dto/list-debt-reminder.dto';
import { RemoveDebtReminderDto } from './dto/remove-debt-reminder.dto';
import {CreateDebtReminderDto} from "../api/debtReminders/dto/create-debt-reminder.dto";

@WebSocketGateway({cors: {
  origin: '*'
}})
export class DebtReminderSocketGateway {
  @WebSocketServer()
  server : Server;
  constructor(
    private readonly debtReminderSocketService: DebtReminderSocketService
  ) {}

  @SubscribeMessage(createDebtReminderSocket)
  async create(@MessageBody() createDebtReminderDto: CreateDebtReminderDto) {
    let data = await this.debtReminderSocketService.create(createDebtReminderDto);
    return this.server.emit(createDebtReminderSocket, {...data})
  }

  @SubscribeMessage(findAllCreatedDebtReminder)
  async findAllCreatedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllCreatedDebtReminder(user.userId);
    return this.server.emit(findAllCreatedDebtReminder, {data, userId: user.userId});
  }

  @SubscribeMessage(findAllReceivedDebtReminder)
  async findAllReceivedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllReceivedDebtReminder(user.userId);
    return this.server.emit(findAllReceivedDebtReminder, {data, userId: user.userId});
  }

  @SubscribeMessage(removeCreatedDebtReminder)
  async remove(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeCreatedDebtReminder(removeDebtReminderDto);
    // this.server.emit(findAllReceivedDebtReminder, data);
    // let debtReminders = await this.debtReminderSocketService.findAllCreatedDebtReminder(removeDebtReminderDto.userId);
    // return this.server.emit(findAllReceivedDebtReminder, debtReminders);
    return this.server.emit(removeCreatedDebtReminder, {...data})
  }

  @SubscribeMessage(removeReceivedDebtReminder)
  async removeReceivedDebtReminder(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeReceivedDebtReminder(removeDebtReminderDto);
    // this.server.emit(findAllReceivedDebtReminder, data);
    return this.server.emit(removeReceivedDebtReminder, {...data})
  }

  @SubscribeMessage(findAllUnPaidDebtReminder)
  async findAllUnPaidDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllUnPaidDebtReminder(user.userId);
    return this.server.emit(findAllUnPaidDebtReminder, {data, userId: user.userId});
  }
}
