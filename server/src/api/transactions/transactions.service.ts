import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {Transaction, TransactionStatus, TransactionType} from "./entities/transaction.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTransferInternalDto} from "./dto/transaction.dto";
import {UserService} from "../users/user.service";
import {JwtService} from "@nestjs/jwt";
import {AccountsService} from "../accounts/accounts.service";
import {UnExistedAccountException} from "../../commons/filters/exceptions/account/UnExistedAccountException";
import {User} from "../users/entity/user.entity";
import {generateOTPCode} from "../../commons/otp-generate/OtpGenerate";
import {sendMail} from "../../commons/mailing/nodemailer";

@Injectable()
export class TransactionsService {
  constructor(
      @InjectRepository(Transaction)
      private transactionResponsive: Repository<Transaction>,
      private userService: UserService,
      private jwtService: JwtService,
      private accountService: AccountsService) {
  }
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  async createTransferInternalRecord(dto: CreateTransferInternalDto,authorization: string) {
    const accessToken = this.userService.getAccessTokenFromClient(authorization);
    const decodedAccessToken = this.jwtService.decode(accessToken);

    const username = Object(decodedAccessToken).username;
    const user: User = await this.userService.getByUsername(username);

    if (user == null) {
      throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
    }

    const accounts = await this.accountService.getActivePaymentAccountByUserId(user.id)
    if (accounts.length === 0 ){
      throw new UnExistedAccountException();
    }

    const paymentAccount = accounts[0]


    const record: Transaction = await this.transactionResponsive.save({
      ...dto,
      status: TransactionStatus.UN_SUCCESS,
      accountSrcNumber: paymentAccount.id,
      userId: user.id,
      transactionType: TransactionType.TRANSFER
    })

    const otpCode = generateOTPCode()

    const mailRes = await sendMail({
      to: user.email,
      subject: 'OTP Transaction Verification',
      html: `<p>Dear <strong>${user.name}</strong>,</p>
            <p>Your <strong>OTP </strong>(expires in 1 minute)&nbsp;for completing your transaction <strong>${record.id}</strong> is: <strong>${otpCode}</strong></p>
            <p>Please use this Passcode to complete your transaction. Do not share this Passcode with anyone.</p>
            <p>Thank you,</p>
            <p><strong>TAIXIU BANK</strong></p>`,
    });

    return {
      data: record,
      statusCode: 200,
      mailInfo: mailRes,
      message: 'Tạo giao dịch chuyển khoản thành công.',
    };
  }

  findAll() {
    return this.transactionResponsive.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
