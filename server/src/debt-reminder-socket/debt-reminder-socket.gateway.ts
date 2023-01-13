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
  findAllReceivedDebtReminder, findAllUnPaidDebtReminder, payDebt,
  payDebtFail,
  payDebtSuccess,
  removeCreatedDebtReminder,
  removeReceivedDebtReminder,
  verifyOtp,
  verifyOtpFail,
  verifyOtpSuccess
} from 'src/constant';
import { ListDebtReminderDto } from './dto/list-debt-reminder.dto';
import { RemoveDebtReminderDto } from './dto/remove-debt-reminder.dto';
import {CreateDebtReminderDto} from "../api/debtReminders/dto/create-debt-reminder.dto";
import {PayDebtReminderDto} from "../api/transactions/dto/pay-debt-reminder.dto";
import { VerifyOtpTransferDto } from './dto/verify-otp-transfer.dto';
import { Roles } from 'src/commons/decorator/roles.decorator';
import { Role } from 'src/api/users/entity/user.entity';

@WebSocketGateway({cors: {
  origin: '*'
}})
export class DebtReminderSocketGateway {
  @WebSocketServer()
  server : Server;
  constructor(
    private readonly debtReminderSocketService: DebtReminderSocketService
  ) {}

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(createDebtReminderSocket)
  async create(@MessageBody() createDebtReminderDto: CreateDebtReminderDto) {
    let data = await this.debtReminderSocketService.create(createDebtReminderDto);
    return this.server.emit(createDebtReminderSocket, {...data})
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(findAllCreatedDebtReminder)
  async findAllCreatedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllCreatedDebtReminder(user.userId);
    return this.server.emit(findAllCreatedDebtReminder, {data, userId: user.userId});
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(findAllReceivedDebtReminder)
  async findAllReceivedDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllReceivedDebtReminder(user.userId);
    return this.server.emit(findAllReceivedDebtReminder, {data, userId: user.userId});
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(removeCreatedDebtReminder)
  async remove(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeCreatedDebtReminder(removeDebtReminderDto);
    return this.server.emit(removeCreatedDebtReminder, {...data})
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(removeReceivedDebtReminder)
  async removeReceivedDebtReminder(@MessageBody() removeDebtReminderDto: RemoveDebtReminderDto) {
    let data = await this.debtReminderSocketService.removeReceivedDebtReminder(removeDebtReminderDto);
    // this.server.emit(findAllReceivedDebtReminder, data);
    return this.server.emit(removeReceivedDebtReminder, {...data})
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(findAllUnPaidDebtReminder)
  async findAllUnPaidDebtReminder(@MessageBody() user: ListDebtReminderDto) {
    let data = await this.debtReminderSocketService.findAllUnPaidDebtReminder(user.userId);
    return this.server.emit(findAllUnPaidDebtReminder, {data, userId: user.userId});
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(payDebt)
  async payDebt(@MessageBody() payDebtReminderDto: PayDebtReminderDto) {
    let data = await this.debtReminderSocketService.payDebt(payDebtReminderDto, payDebtReminderDto.authorization);
    if (data.statusCode == 200) {
      return this.server.emit(payDebtSuccess , {...data})
    }
    else return this.server.emit(payDebtFail , {...data})
  }

  @Roles(Role.CUSTOMER)
  @SubscribeMessage(verifyOtp)
  async verifyOtp(@MessageBody() verifyOtpDto : VerifyOtpTransferDto){
    let data = await this.debtReminderSocketService.verifyOtp(verifyOtpDto);
    if (data.statusCode == 200) {
      return this.server.emit(verifyOtpSuccess, data);
    }
    else {
      return this.server.emit(verifyOtpFail, data);
    }
  }
}
