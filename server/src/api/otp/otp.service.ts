import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Otp, OTPType} from "./entities/otp.entity";
import {CreateTransferOtpDto} from "./dto/otp.dto";

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp)
        private repos: Repository<Otp>,
    ) {}

    createTransferOtp(dto: CreateTransferOtpDto) {
        Logger.log({...dto})
        return this.repos.save({...dto,otpType: OTPType.TRANSACTION})
    }

    getLastestOtpByTransactionOfCustomer(customerId:number, transactionId:number) {
        return this.repos.findOne({
            where: {
                customerId: customerId,
                transactionId: transactionId
            },
            order: {
                createdAt: "DESC"
            }
        })
    }
}