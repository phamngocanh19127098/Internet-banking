import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  PayTransactionFeeType,
  Transaction,
  TransactionStatus,
  TransactionType,
} from './entities/transaction.entity';
import { Brackets, Repository, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTransferDto,
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
import { OtpExpiredTimeException } from '../../commons/filters/exceptions/otp/OtpExpiredTimeException';
import { InvalidOtpException } from '../../commons/filters/exceptions/otp/InvalidOtpException';
import { UnExistedTransactionException } from '../../commons/filters/exceptions/transaction/UnExistedTransactionException';
import { sendMail } from '../../commons/mailing/nodemailer';
import { DebtReminder } from '../debtReminders/entities/debtReminders.entity';
import { AffiliatedBanksService } from '../affiliatedBanks/affiliatedBanks.service';
import { NotConnectBankInfoException } from '../../commons/filters/exceptions/sercurity/NotConnectBankInfoException';
import SolarBankService, {
  SOLAR_BANK_CODE,
} from '../../client/SolarBank/SolarBank.service';
import { InvalidAmountException } from '../../commons/filters/exceptions/transaction/InvalidAmountException';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private userService: UserService,
    private jwtService: JwtService,
    private accountService: AccountsService,
    private otpService: OtpService,
    @InjectRepository(DebtReminder)
    private readonly debtReminderRepository: Repository<DebtReminder>,
    private affiliatedBanksService: AffiliatedBanksService,
  ) {}

  async createTransferRecord(
    dto: CreateTransferDto,
    authorization: string,
    transactionType: TransactionType,
  ) {
    const accessToken =
      this.userService.getAccessTokenFromClient(authorization);
    const decodedAccessToken = this.jwtService.decode(accessToken);

    const username = Object(decodedAccessToken).username;
    const user: User = await this.userService.getByUsername(username);
    if (!dto.bankDesId) {
      const des: Account[] =
        await this.accountService.getActivePaymentAccountByAccountNumber(
          dto.accountDesNumber,
        );

      if (des.length === 0) {
        throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
      }
    }

    if (user == null) {
      throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
    }

    const accounts = await this.accountService.getActivePaymentAccountByUserId(
      user.id,
    );
    if (accounts.length === 0) {
      throw new UnExistedAccountException();
    }

    const paymentAccount = accounts[0];
    const amountWithFee =
      dto.payTransactionFee === PayTransactionFeeType.SRC
        ? +dto.amount + Number(process.env.EXTERNAL_FEE)
        : +dto.amount;
    if (amountWithFee > paymentAccount.currentBalance)
      throw new InvalidAmountException();
    try {
      const record: Transaction = await this.transactionRepository.save({
        ...dto,
        status: TransactionStatus.UN_SUCCESS,
        accountSrcNumber: paymentAccount.accountNumber,
        userId: user.id,
        transactionType: transactionType,
      });

      const otpCode = generateOTPCode();

      const otpTransferDto = new CreateTransferOtpDto(
        user.id,
        record.id,
        otpCode,
      );

      await this.otpService.createTransferOtp(otpTransferDto);

      const otpExpireTime =
        Number(process.env.OTP_EXPIRATION_TIME) / 60000 || 1;

      await sendMail({
        to: user.email,
        subject: `OTP Transaction ${record.id} Verification `,
        html: `<p>Dear <strong>${user.name}</strong>,</p>
            <p>Your <strong>OTP </strong>(expires in ${otpExpireTime} minute)&nbsp;for completing your transaction <strong>${record.id}</strong> is: <strong>${otpCode}</strong></p>
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
      Logger.log(error);
      throw new InternalServerErrorException(
        'Lỗi trong quá trình tạo thông tin giao dịch.',
      );
    }
  }

  async createTransferExternalRecord(
    dto: CreateTransferDto,
    accountSrcNumber: string,
    bankId: number,
  ) {
    const des: Account[] =
      await this.accountService.getActivePaymentAccountByAccountNumber(
        dto.accountDesNumber,
      );

    if (des.length === 0) {
      throw new BadRequestException('Lỗi khi đang tìm kiếm nguời dùng!');
    }
    try {
      const amountWithFee =
        dto.payTransactionFee === PayTransactionFeeType.DES
          ? dto.amount - Number(process.env.EXTERNAL_FEE)
          : dto.amount;

      await this.accountService.updateBalanceByAccountNumber(
        dto.accountDesNumber,
        amountWithFee,
        TransactionType.RECEIVE,
      );

      const record: Transaction = await this.transactionRepository.save({
        ...dto,
        status: TransactionStatus.SUCCESS,
        accountSrcNumber: accountSrcNumber,
        transactionType: TransactionType.RECEIVE,
        bankDesId: bankId,
      });

      return {
        data: record,
        statusCode: 200,
        message: 'Tạo giao dịch chuyển khoản thành công.',
      };
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException(
        'Lỗi trong quá trình tạo thông tin giao dịch.',
      );
    }
  }

  async verifyTransferOtp(
    dto: VerifyTransferInternalDto,
    authorization: string,
  ) {
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
    const lastOtp = await this.otpService.getLastestOtpByTransactionOfCustomer(
      user.id,
      dto.transactionId,
    );
    const currTime = new Date();
    currTime.setHours(currTime.getHours() - 7);
    const otpExpirationTime = parseInt(
      process.env.OTP_EXPIRATION_TIME || '60000',
    );
    if (currTime.getTime() - lastOtp.createdAt.getTime() > otpExpirationTime) {
      throw new OtpExpiredTimeException();
    } else if (lastOtp.otpCode !== dto.otpCode) {
      throw new InvalidOtpException();
    }
    transaction.status = TransactionStatus.SUCCESS;

    if (!transaction.bankDesId) {
      const amountWithFeeForSrc =
        transaction.payTransactionFee === PayTransactionFeeType.SRC
          ? transaction.amount + Number(process.env.INTERNAL_FEE)
          : transaction.amount;
      await this.accountService.updateBalanceByAccountNumber(
        transaction.accountSrcNumber,
        amountWithFeeForSrc,
        TransactionType.TRANSFER,
      );
      const amountWithFeeForDes =
        transaction.payTransactionFee === PayTransactionFeeType.DES
          ? transaction.amount - Number(process.env.INTERNAL_FEE)
          : transaction.amount;
      await this.accountService.updateBalanceByAccountNumber(
        transaction.accountDesNumber,
        amountWithFeeForDes,
        TransactionType.RECEIVE,
      );
    } else {
      const linkedBank = await this.affiliatedBanksService.findOne(
        transaction.bankDesId,
      );
      if (!linkedBank) throw new NotConnectBankInfoException();
      if (linkedBank.slug === SOLAR_BANK_CODE) {
        const infoTransaction = {
          transaction_id: transaction.id,
          src_account_number: transaction.accountSrcNumber,
          des_account_number: transaction.accountDesNumber,
          transaction_amount: transaction.amount,
          otp_code: dto.otpCode,
          transaction_message: transaction.description || '',
          pay_transaction_fee: transaction.payTransactionFee,
          is_success: 0,
          transaction_created_at: transaction.createdAt,
          transaction_type: 2,
          user_id: user.id,
          full_name: user.name,
          email: user.email,
          phone: user.phone || '',
        };
        await SolarBankService.intertransaction(
          infoTransaction,
          linkedBank.publicKey,
        );
        const amountWithFeeForSrc =
          transaction.payTransactionFee === PayTransactionFeeType.SRC
            ? transaction.amount + Number(process.env.EXTERNAL_FEE)
            : transaction.amount;
        await this.accountService.updateBalanceByAccountNumber(
          transaction.accountSrcNumber,
          amountWithFeeForSrc,
          TransactionType.TRANSFER,
        );
      }
    }
    try {
      const res = await this.transactionRepository.save(transaction);
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

  async findAll(fromDate: Date, toDate: Date, affiliatedBankId: number) {
    let query = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.bankDes', 'bankDes')
      .andWhere('transaction.bankDesId is not null')
      .select(['transaction', 'bankDes']);
    if (fromDate && toDate) {
      query.andWhere('transaction.createdAt >= :fromDate', { fromDate });
      query.andWhere('transaction.createdAt <= :toDate', { toDate });
    }

    if (affiliatedBankId) {
      query.andWhere('transaction.bankDesId = :affiliatedBankId', {
        affiliatedBankId,
      });
    }

    let result = await query.getMany();
    const { receivedAmount, sentAmount } = this.calculateTransaction(result);

    return {
      statusCode: 200,
      message: 'Lấy danh sách các giao dịch thành công',
      data: {
        receivedAmount,
        sentAmount,
        transactions: result,
      },
    };
  }

  async findAllWithoutCondition() {
    return this.transactionRepository.find({
      where: {
        status: 1,
      },
    });
  }

  async findOne(id: number) {
    return this.transactionRepository.findOneBy({ id });
  }

  async findByBankId(bankid: number) {
    let transactions: Transaction[];

    if (bankid) {
      transactions = await this.transactionRepository.findBy({
        bankDesId: bankid,
        status: 1,
      });
    } else {
      transactions = await this.transactionRepository.find({
        where: {
          bankDesId: IsNull(),
          status: 1,
        },
      });
    }
    return {
      data: transactions,
      message: 'Lấy danh sách các giao dịch theo Bank Id thành công',
      statusCode: 200,
    };
  }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }

  // async getAllTransactions(accountNumber: string) {
  //   try {
  //     let timeZone = new Date()
  //     timeZone.setDate(timeZone.getDate() - 30);

  //     let account: Account = await this.accountRepository.findOne({
  //       where: {
  //         accountNumber,
  //       },
  //     });

  //     if (account == null) {
  //       throw new BadRequestException('Không tồn tại tài khoản người dùng!');
  //     }

  //     let data = await this.transactionRepository
  //         .createQueryBuilder('transaction')
  //         .leftJoin('transaction.accountDes', 'accountDes')
  //         .leftJoin('transaction.accountSrc', 'accountSrc')
  //         .select('transaction')
  //         .where(
  //           new Brackets((qb) => {
  //             qb.where('accountDes.accountNumber =:accountNumber', {
  //               accountNumber,
  //             });
  //             qb.orWhere('accountSrc.accountNumber =:accountNumber', {
  //               accountNumber,
  //             });
  //           }),
  //         ).andWhere('transaction.createdAt >:timeZone',{timeZone})
  //         .orderBy('transaction.createdAt', 'DESC')
  //         .getMany();

  //     return data;
  //   } catch (e) {
  //     throw new InternalServerErrorException(
  //         'Lỗi trong quá trình lấy giao dịch người dùng',
  //     );
  //   }
  // }

  async getTransactionDebtReminderByAccountNumber(accountNumber: string) {
    try {
      let type = TransactionType.DEBT_REMINDERS_PAYMENT;
      let timeZone = new Date();
      timeZone.setDate(timeZone.getDate() - 30);

      let status = 1;

      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoin('transaction.accountDes', 'accountDes')
        .leftJoin('accountDes.user', 'userDes')
        .leftJoin('transaction.accountSrc', 'accountSrc')
        .leftJoin('accountSrc.user', 'userSrc')
        .select([
          'transaction',
          'accountSrc.id',
          'userSrc.name',
          'accountDes.id',
          'userDes.name',
        ])
        .where('transaction.transactionType =:type', {
          type,
        })
        .andWhere('accountSrc.accountNumber =:accountNumber', {
          accountNumber,
        })
        .andWhere('transaction.createdAt >:timeZone', { timeZone })
        .andWhere('transaction.status =:status', { status })
        .orderBy('transaction.createdAt', 'DESC')
        .getMany();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy giao dịch người dùng',
      );
    }
  }

  async getTransactionReceivedByAccountNumber(accountNumber: string) {
    try {
      let timeZone = new Date();
      timeZone.setDate(timeZone.getDate() - 30);

      let status = 1;

      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoin('transaction.accountDes', 'accountDes')
        .leftJoin('accountDes.user', 'userDes')
        .leftJoin('transaction.accountSrc', 'accountSrc')
        .leftJoin('accountSrc.user', 'userSrc')
        .select([
          'transaction',
          'accountSrc.id',
          'userSrc.name',
          'accountDes.id',
          'userDes.name',
        ])
        .where('accountDes.accountNumber =:accountNumber', {
          accountNumber,
        })
        .andWhere('transaction.createdAt >:timeZone', { timeZone })
        .andWhere('transaction.status =:status', { status })
        .orderBy('transaction.createdAt', 'DESC')
        .getMany();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy giao dịch người dùng',
      );
    }
  }

  async getTransactionTransferByAccountNumber(accountNumber: string) {
    try {
      let type = TransactionType.TRANSFER;
      let timeZone = new Date();
      timeZone.setDate(timeZone.getDate() - 30);

      let status = 1;

      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoin('transaction.accountDes', 'accountDes')
        .leftJoin('accountDes.user', 'userDes')
        .leftJoin('transaction.accountSrc', 'accountSrc')
        .leftJoin('accountSrc.user', 'userSrc')
        .select([
          'transaction',
          'accountSrc.id',
          'userSrc.name',
          'accountDes.id',
          'userDes.name',
        ])
        .where('transaction.transactionType =:type', {
          type,
        })
        .andWhere('accountSrc.accountNumber =:accountNumber', {
          accountNumber,
        })
        .andWhere('transaction.createdAt >:timeZone', { timeZone })
        .andWhere('transaction.status =:status', { status })
        .orderBy('transaction.createdAt', 'DESC')
        .getMany();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy giao dịch người dùng',
      );
    }
  }

  async getTransactionByAccountNumber(accountNumber: string) {
    try {
      let timeZone = new Date();
      timeZone.setDate(timeZone.getDate() - 30);

      let status = 1;

      let account: Account = await this.accountRepository.findOne({
        where: {
          accountNumber,
        },
      });

      if (account == null) {
        throw new BadRequestException('Không tồn tại tài khoản người dùng!');
      }

      let data = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoin('transaction.accountDes', 'accountDes')
        .leftJoin('accountDes.user', 'userDes')
        .leftJoin('transaction.accountSrc', 'accountSrc')
        .leftJoin('accountSrc.user', 'userSrc')
        .select([
          'transaction',
          'accountSrc.id',
          'userSrc.name',
          'accountDes.id',
          'userDes.name',
        ])
        .where(
          new Brackets((qb) => {
            qb.where('accountDes.accountNumber =:accountNumber', {
              accountNumber,
            });
            qb.orWhere('accountSrc.accountNumber =:accountNumber', {
              accountNumber,
            });
          }),
        )
        .andWhere('transaction.createdAt >:timeZone', { timeZone })
        .andWhere('transaction.status =:status', { status })
        .orderBy('transaction.createdAt', 'DESC')
        .getMany();

      return data;
    } catch (e) {
      throw new InternalServerErrorException(
        'Lỗi trong quá trình lấy giao dịch người dùng',
      );
    }
  }

  calculateTransaction(transactions: Transaction[]) {
    let receivedAmount = 0;
    let sentAmount = 0;
    for (let transaction of transactions) {
      if (transaction.transactionType == TransactionType.TRANSFER) {
        sentAmount += transaction.amount;
      } else if (transaction.transactionType == TransactionType.RECEIVE) {
        receivedAmount += transaction.amount;
      } else if (transaction.transactionType == TransactionType.RECHARGE) {
        receivedAmount += transaction.amount;
      } else if (
        transaction.transactionType == TransactionType.DEBT_REMINDERS_PAYMENT
      ) {
        sentAmount += transaction.amount;
      }
    }
    return { receivedAmount, sentAmount };
  }
}
