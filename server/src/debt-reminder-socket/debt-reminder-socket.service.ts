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
import {CreateDebtReminderDto} from "../api/debtReminders/dto/create-debt-reminder.dto";
import {PayDebtReminderDto} from "../api/transactions/dto/pay-debt-reminder.dto";
import { User } from 'src/api/users/entity/user.entity';
import {JwtService} from '@nestjs/jwt';
import { VerifyOtpTransferDto } from './dto/verify-otp-transfer.dto';
import { TransactionsService } from 'src/api/transactions/transactions.service';
import { VerifyTransferInternalDto } from 'src/api/transactions/dto/transaction.dto';

@Injectable()
export class DebtReminderSocketService {
  constructor(
    @InjectRepository(DebtReminder)
    private readonly debtReminderRepository : Repository<DebtReminder>,
    private readonly debtReminderService : DebtRemindersService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly transactionService : TransactionsService
  ){

  }
  async create(createDebtReminderDto: CreateDebtReminderDto) {
    return await this.debtReminderService.create(createDebtReminderDto);
  }

  async findAllCreatedDebtReminder(userId: string) {
    return await this.debtReminderService.getDebtReminderCreated(+userId);
    // return `This action returns all debtReminderSocket`;
  }

  async findAllReceivedDebtReminder(userId: string) {
    return await this.debtReminderService.getDebtReminderReceived(+userId);
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

    await this.debtReminderRepository.delete({
      id : debtReminder.id
    });
    debtReminder['actionTakerName'] = user.name;
    return debtReminder;
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
    await this.debtReminderRepository.delete({
      id : debtReminder.id
    });
    debtReminder['actionTakerName'] = user.name;
    return debtReminder;
  }

  async findAllUnPaidDebtReminder(userId: string) {
    return await this.debtReminderService.getUnPaidDebtReminder(+userId);
    // return `This action returns all debtReminderSocket`;
  }

  async payDebt(payDebtReminderDto: PayDebtReminderDto, authorization : string) {
    const accessToken =
        this.userService.getAccessTokenFromClient(authorization);
      const decodedAccessToken = this.jwtService.decode(accessToken);

      const username = Object(decodedAccessToken).username;
      const user: User = await this.userService.getByUsername(username);
    let result = await this.debtReminderService.payDebtReminder(payDebtReminderDto, authorization);
    result['userId'] = user.id
    return result;
  }
  async verifyOtp(verifyOtpDto : VerifyOtpTransferDto) {
    let verifyDto : VerifyTransferInternalDto = {
      transactionId: verifyOtpDto.transactionId,
      otpCode: verifyOtpDto.otpCode,
    }
    let data = await this.transactionService.verifyTransferOtp(verifyDto, verifyOtpDto.authorization);
    return data;
  }
}
