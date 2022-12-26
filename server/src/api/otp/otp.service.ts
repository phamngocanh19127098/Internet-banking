import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp, OTPType } from './entities/otp.entity';
import {
  CreateForgotPasswordOtpDto,
  CreateTransferOtpDto,
} from './dto/otp.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private repos: Repository<Otp>,
  ) {}

  createTransferOtp(dto: CreateTransferOtpDto) {
    Logger.log({ ...dto });
    return this.repos.save({ ...dto, otpType: OTPType.TRANSACTION });
  }

  getLastestOtpByTransactionOfCustomer(
    customerId: number,
    transactionId: number,
  ) {
    return this.repos.findOne({
      where: {
        customerId: customerId,
        transactionId: transactionId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  createForgotPasswordOtp(dto: CreateForgotPasswordOtpDto) {
    Logger.log({ ...dto });
    return this.repos.save({ ...dto, otpType: OTPType.FORGET_PW });
  }

  getLastestOtpByForgetPassword(customerId: number) {
    return this.repos.findOne({
      where: {
        customerId,
        otpType: OTPType.FORGET_PW,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
