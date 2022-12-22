import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from './entities/transaction.entity';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTransferInternalDto,
  VerifyTransferInternalDto,
} from './dto/transaction.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import { UnExistedAccountException } from '../../commons/filters/exceptions/account/UnExistedAccountException';
import { User } from '../users/entity/user.entity';
import { generateOTPCode } from '../../commons/otp-generate/OtpGenerate';
import { Account } from '../accounts/entities/account.entity';
import { CreateTransferOtpDto } from '../otp/dto/otp.dto';
import { OtpService } from '../otp/otp.service';
import { Otp } from '../otp/entities/otp.entity';
import { OtpExpiredTimeException } from '../../commons/filters/exceptions/otp/OtpExpiredTimeException';
import { InvalidOtpException } from '../../commons/filters/exceptions/otp/InvalidOtpException';
import { UnExistedTransactionException } from '../../commons/filters/exceptions/transaction/UnExistedTransactionException';
import { sendMail } from '../../commons/mailing/nodemailer';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionResponsive: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    private jwtService: JwtService,
    private accountService: AccountsService,
    private otpService: OtpService,
  ) {}
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  async createTransferInternalRecord(
    dto: CreateTransferInternalDto,
    authorization: string,
  ) {
    try {
      const accessToken =
        this.userService.getAccessTokenFromClient(authorization);
      const decodedAccessToken = this.jwtService.decode(accessToken);

      const username = Object(decodedAccessToken).username;
      const user: User = await this.userService.getByUsername(username);
      const des: Account[] =
        await this.accountService.getActivePaymentAccountById(
          dto.accountDesNumber,
        );

      if (des.length === 0) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }

      if (user == null) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }

      const accounts =
        await this.accountService.getActivePaymentAccountByUserId(user.id);
      if (accounts.length === 0) {
        throw new UnExistedAccountException();
      }

      const paymentAccount = accounts[0];

      const record: Transaction = await this.transactionResponsive.save({
        ...dto,
        status: TransactionStatus.UN_SUCCESS,
        accountSrcNumber: paymentAccount.id,
        userId: user.id,
        transactionType: TransactionType.TRANSFER,
      });

      const otpCode = generateOTPCode();

      const otpTransferDto = new CreateTransferOtpDto(
        user.id,
        record.id,
        otpCode,
      );

      const otpRes: Otp = await this.otpService.createTransferOtp(
        otpTransferDto,
      );

      const mailRes = await sendMail({
        to: user.email,
        subject: `OTP Transaction ${record.id} Verification `,
        html: `<p>Dear <strong>${user.name}</strong>,</p>
            <p>Your <strong>OTP </strong>(expires in 1 minute)&nbsp;for completing your transaction <strong>${record.id}</strong> is: <strong>${otpCode}</strong></p>
            <p>Please use this Passcode to complete your transaction. Do not share this Passcode with anyone.</p>
            <p>Thank you,</p>
            <p><strong>TAIXIU BANK</strong></p>`,
      });

      return {
        data: record,
        statusCode: 200,
        message: 'Tạo giao dịch chuyển khoản thành công.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình tạo thông tin giao dịch.',
      );
    }
  }

  async verifyTransferInternalOtp(
    dto: VerifyTransferInternalDto,
    authorization: string,
  ) {
    try {
      const accessToken =
        this.userService.getAccessTokenFromClient(authorization);
      const decodedAccessToken = this.jwtService.decode(accessToken);

      const username = Object(decodedAccessToken).username;
      const user: User = await this.userService.getByUsername(username);

      if (user == null) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }
      let transaction = await this.findOne(dto.transactionId);
      if (!transaction) {
        throw new UnExistedTransactionException();
      }
      const lastOtp =
        await this.otpService.getLastestOtpByTransactionOfCustomer(
          user.id,
          dto.transactionId,
        );
      const currTime = new Date();
      currTime.setHours(currTime.getHours() - 7);
      const otpExpirationTime = parseInt(
        process.env.OTP_EXPIRATION_TIME || '60000',
      );
      if (
        currTime.getTime() - lastOtp.createdAt.getTime() >
        otpExpirationTime
      ) {
        throw new OtpExpiredTimeException();
      } else if (lastOtp.otpCode !== dto.otpCode) {
        throw new InvalidOtpException();
      }
      transaction.status = TransactionStatus.SUCCESS;

      await this.accountService.updateBalanceById(
        transaction.accountSrcNumber,
        transaction.amount,
        TransactionType.TRANSFER,
      );
      await this.accountService.updateBalanceById(
        transaction.accountDesNumber,
        transaction.amount,
        TransactionType.RECEIVE,
      );
      const res = await this.transactionResponsive.save(transaction);
      return {
        data: res,
        statusCode: 200,
        message: `Thực hiện giao dịch chuyển khoản id= ${dto.transactionId} thành công.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình thực hiện xác thực giao dịch.',
      );
    }
  }

  findAll() {
    return this.transactionResponsive.find();
  }

  findOne(id: number) {
    return this.transactionResponsive.findOneBy({ id });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async getTransactionByAccountNumber(
    accountNumber: string,
    transactionType: string,
  ) {
    try {
      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionResponsive
        .createQueryBuilder('transaction')
        .leftJoin('transaction.accountDes', 'accountDes')
        .leftJoin('transaction.accountSrc', 'accountSrc')
        .select('transaction')
        .where('transaction.transactionType =:transactionType', {
          transactionType,
        })
        .andWhere(
          new Brackets((qb) => {
            qb.where('accountDes.accountNumber =:accountNumber', {
              accountNumber,
            });
            qb.orWhere('accountSrc.accountNumber =:accountNumber', {
              accountNumber,
            });
          }),
        )
        .orderBy('transaction.createdAt', 'DESC')
        .getMany();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy giao dịch người dùng',
      );
    }
  }
}
