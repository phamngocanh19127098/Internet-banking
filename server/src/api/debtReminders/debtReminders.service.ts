import {Injectable} from '@nestjs/common';
import {CreateDebtReminderDto} from './dto/create-debt-reminder.dto';
import {UpdateDebtReminderDto} from './dto/update-debt-reminder.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {DebtReminder} from './entities/debtReminders.entity';
import {DebtReminderEnum} from './enum/debtReminder.enum';
import {UserService} from '../users/user.service';
import {BadRequestException, NotAcceptableException} from '@nestjs/common/exceptions';
import {AccountsService} from "../accounts/accounts.service";
import {CreateTransferInternalDto} from "../transactions/dto/transaction.dto";
import {PayDebtReminderDto} from "../transactions/dto/pay-debt-reminder.dto";
import {TransactionsService} from "../transactions/transactions.service";
import {TransactionType} from "../transactions/entities/transaction.entity";

@Injectable()
export class DebtRemindersService {
  constructor(
    @InjectRepository(DebtReminder)
    private repos: Repository<DebtReminder>,
    private readonly userService : UserService,
    private readonly accountService: AccountsService,
    private readonly transactionService: TransactionsService,
  ) {}
  async create(createDebtReminderDto: CreateDebtReminderDto) {
    
    let { accountDesNumber, amount, description, userId, accountSrcNumber, receiverId } =
      createDebtReminderDto;

    let user = await this.userService.getUserById(+userId);

    if (user == null) {
      throw new NotAcceptableException('Nguời chuyển không tồn tại')
    }

    let receiver = await this.userService.getUserById(+receiverId);

    if (user == null) {
      throw new NotAcceptableException('Nguời nhận không tồn tại')
    }

    let debtReminderDto = {
      accountDesNumber: +accountDesNumber,
      accountSrcNumber: +accountSrcNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      amount: amount,
      description: description,
      paymentId: null,
      userId: +userId,
      paymentStatus: DebtReminderEnum.UNPAID,
      receiverId
    };

    let debtReminder = this.repos.create(debtReminderDto);

    debtReminder = await this.repos.save(debtReminder);

    return debtReminder;
  }

  findAll() {
    return this.repos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} debtReminder`;
  }

  update(id: number, updateDebtReminderDto: UpdateDebtReminderDto) {
    return `This action updates a #${id} debtReminder`;
  }

  async remove(id: number) {
    let debtReminder = await this.repos.findOne({
      where : {
        id,
      }
    })

    return `This action removes a #${id} debtReminder`;
  }

  async getDebtReminderCreated(id : number){
    
    let debtReminder = await this.repos.createQueryBuilder('debtReminder')
      .leftJoin('debtReminder.user', 'user')
      .leftJoin('debtReminder.receiver', 'receiver')
      .select(['debtReminder',
       'user.id', 'user.name','user.username', 'user.email', 'user.dob', 'user.phone', 'user.address',
       'receiver.id', 'receiver.username', 'receiver.email', 'receiver.dob', 'receiver.phone', 'receiver.address'])
      .where('debtReminder.userId = :id', {id})
      .getMany();

    return debtReminder || [];
  }

  async getDebtReminderReceived(id : number){
    
    let debtReminder = await this.repos.createQueryBuilder('debtReminder')
      .leftJoin('debtReminder.user', 'user')
      .leftJoin('debtReminder.receiver', 'receiver')
      .select(['debtReminder',
       'user.id', 'user.name','user.username', 'user.email', 'user.dob', 'user.phone', 'user.address',
       'receiver.id', 'receiver.username', 'receiver.email', 'receiver.dob', 'receiver.phone', 'receiver.address'])
      .where('debtReminder.receiverId = :id', {id})
      .getMany();

    return debtReminder || [];
  }

  async getUnPaidDebtReminder(id : number) {
    let debtReminder = await this.repos.createQueryBuilder('debtReminder')
      .leftJoin('debtReminder.user', 'user')
      .leftJoin('debtReminder.receiver', 'receiver')
      .select(['debtReminder',
       'user.id', 'user.name','user.username', 'user.email', 'user.dob', 'user.phone', 'user.address',
       'receiver.id', 'receiver.username', 'receiver.email', 'receiver.dob', 'receiver.phone', 'receiver.address'])
      .where('debtReminder.receiverId = :id', {id})
      .andWhere('debtReminder.paymentStatus = :paymentStatus', {paymentStatus : DebtReminderEnum.UNPAID})
      .getMany();

    return debtReminder || [];
  }

  async payDebtReminder(user, payDebtReminderDto : PayDebtReminderDto, authorization: string){
    console.log(payDebtReminderDto)
    let receiverAccount = await this.accountService.getPaymentAccountByUserId(payDebtReminderDto.toUserId);
    if (!receiverAccount) {
      throw new BadRequestException("Không tồn tại tài khoản nhận")
    }
    let createTransferInternalDto: CreateTransferInternalDto = {
      accountDesNumber: receiverAccount.accountNumber,
      amount: payDebtReminderDto.amount,
      description: ''
    }

    return await this.transactionService.createTransferInternalRecord(createTransferInternalDto,authorization ,TransactionType.DEBT_REMINDERS_PAYMENT);
  }
}
