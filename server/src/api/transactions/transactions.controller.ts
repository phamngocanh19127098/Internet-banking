import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  CreateTransferExternalDto,
  CreateTransferDto,
  VerifyTransferInternalDto,
} from './dto/transaction.dto';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import { NotConnectBankInfoException } from '../../commons/filters/exceptions/sercurity/NotConnectBankInfoException';
import verifyMessage from '../../commons/crypto/verify/VerifyMessage';
import { AffiliatedBanksService } from '../affiliatedBanks/affiliatedBanks.service';
import verifySignature from '../../commons/crypto/verify/VerifySignature';
import testSignature from '../../commons/crypto/testSign';
import testMsgToken from '../../commons/crypto/testMsgToken';
import createSignature from '../../commons/crypto/createSignature';
import { TransactionType } from './entities/transaction.entity';
import SolarBankService from '../../client/SolarBank/SolarBank.service';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist';
import { BankIdDto } from './dto/bankIdDto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private affiliatedBanksService: AffiliatedBanksService,
  ) {}

  @ApiOperation({ description: 'Lấy tất cả transaction. Admin mới dùng được.' })
  @ApiOkResponse({ description: 'Lấy tất cả transaction thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Tạo giao dịch chuyển khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get('/list')
  findAllfindAllWithoutCondition() {
    return this.transactionsService.findAllWithoutCondition();
  }

  @ApiOperation({
    description: 'Tạo giao dịch chuyển khoản. Customer mới dùng được.',
  })
  @ApiCreatedResponse({ description: 'Tạo giao dịch chuyển khoản thành công' })
  @ApiBadRequestResponse({ description: 'Lỗi khi đang tìm kiếm người dùng' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Tạo giao dịch chuyển khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Post('/transfer')
  createTransferInternal(
    @Body() createTransferInternalDto: CreateTransferDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.transactionsService.createTransferRecord(
      createTransferInternalDto,
      authorization,
      TransactionType.TRANSFER,
    );
  }

  @ApiOperation({
    description: 'Verify giao dịch chuyển khoản. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Thực hiện giao dịch chuyển khoản thành công' })
  @ApiBadRequestResponse({ description: 'Lỗi khi đang tìm kiếm người dùng' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Verify giao dịch chuyển khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Post('/transfer/verify')
  verifyTransferInternal(
    @Body() verifyTransferInternalDto: VerifyTransferInternalDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.transactionsService.verifyTransferOtp(
      verifyTransferInternalDto,
      authorization,
    );
  }

  @ApiOperation({
    description: 'Nộp tiền vào tài khoản từ liên ngân hàng',
  })
  @ApiOkResponse({ description: 'Tạo giao dịch chuyển khoản thành công.' })
  @ApiBadRequestResponse({ description: 'Lỗi khi đang tìm kiếm người dùng' })
  @ApiInternalServerErrorResponse({
    description: 'Lỗi trong quá trình tạo thông tin giao dịch.',
  })
  @Post('/external/order-for-payment')
  async createTransferExternal(@Body() dto: CreateTransferExternalDto) {
    const linkedBank = await this.affiliatedBanksService.findOneBySlug(
      dto.slug,
    );
    if (!linkedBank) throw new NotConnectBankInfoException();
    const data = {
      ...dto.transactionInfo,
      accountSrcNumber: dto.accountNumber,
      slug: dto.slug,
    };
    verifyMessage(dto.msgToken, data, dto.timestamp, linkedBank.secretKey);
    verifySignature(
      dto.signature,
      linkedBank.publicKey,
      linkedBank.cryptoType,
      data,
    );
    const newTrans =
      await this.transactionsService.createTransferExternalRecord(
        dto.transactionInfo,
        dto.accountNumber,
        linkedBank.id,
      );
    const newTransInfo = {
      ...newTrans.data,
    };
    return {
      ...newTrans,
      signature: createSignature(newTransInfo),
    };
  }

  @Get('/external/test-api')
  async testExternalApi() {
    const timestamp = new Date().getTime();
    Logger.log(timestamp);
    let data = {
      accountDesNumber: '23875338674',
      amount: 50000,
      description: 'Transfer Money SLB',
      payTransactionFee: 'SRC',
      accountSrcNumber: '28069884',
      slug: 'SLB',
    };
    const testToken = testMsgToken(data, timestamp, 'FwOhnqMkrv');
    const testSign = testSignature(data);
    return { testToken, testSign };
  }

  @Get('/external/test-api-intertransaction')
  async testExternalApiIntertransaction() {
    const timestamp = new Date().getTime();
    Logger.log(timestamp);
    const linkedBank = await this.affiliatedBanksService.findOneBySlug('SLB');
    if (!linkedBank) throw new NotConnectBankInfoException();
    const infoTransaction = {
      transaction_id: 1,
      src_account_number: '60000',
      des_account_number: '01325183',
      transaction_amount: 30000,
      otp_code: '345676',
      transaction_message: 'Transfer Money',
      pay_transaction_fee: 'DES',
      is_success: 0,
      transaction_created_at: '2022-12-30T11:16:00.000Z',
      transaction_type: 2,
      user_id: 1,
      full_name: 'Le Van A',
      email: 'vana@gmail.com',
      phone: '0943095594',
    };
    await SolarBankService.intertransaction(
      infoTransaction,
      linkedBank.publicKey,
    );
    return {
      data: true,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch thành công.',
    };
  }

  @ApiOperation({
    description: 'Lấy danh sách các giao dịch. Admin mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách các giao dịch thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tồn tại ngân hàng cần đối soát',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách các giao dịch',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Get()
  findAll(
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
    @Query('affiliatedBankId') affiliatedBankId: string,
  ) {
    return this.transactionsService.findAll(
      fromDate,
      toDate,
      +affiliatedBankId,
    );
  }

  @ApiOperation({
    description:
      'Lấy danh sách các giao dịch theo Bank Id. Admin mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách các giao dịch theo Bank Id thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tồn tại ngân hàng cần đối soát',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy danh sách các giao dịch theo Bank Id',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Post('listWithBankId')
  findByBankId(@Body() dto: BankIdDto) {
    return this.transactionsService.findByBankId(dto.bankId);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }

  // @Get('list/:accountNumber')
  // // @ApiOperation({ description: 'Lấy thông tin giao dịch bằng số tài khoản' })
  // @ApiQuery({ name: 'type', enum: TransactionType })
  // //http://localhost:3001/transactions/list/12345?type=TRANSFER test
  // async getTransactionByAccountNumber(
  //   @Param('accountNumber') accountNumber: string,
  //   @Query('type') type: TransactionType = TransactionType.TRANSFER,
  //   // @Query() query,
  // ) {
  //   let data = await this.transactionsService.getTransactionByAccountNumber(
  //     accountNumber,
  //     type,
  //   );
  //   return {
  //     data,
  //     statusCode: 200,
  //     message: 'Lấy thông tin giao dịch thành công.',
  //   };
  // }

  @ApiOperation({
    description:
      'Lấy thông tin giao dịch bằng số tài khoản. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Lấy danh sách giao dịch thành công' })
  @ApiBadRequestResponse({
    description: 'Account không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin giao dịch bằng số tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER, Role.EMPLOYEE)
  @Get('list/:accountNumber')
  async getAllTransactions(@Param('accountNumber') accountNumber: string) {
    const data = await this.transactionsService.getTransactionByAccountNumber(
      accountNumber,
    );

    return {
      data,
      statusCode: 200,
      message: 'Lấy tất cả giao dịch thành công.',
    };
  }

  @ApiOperation({
    description:
      'Lấy thông tin giao dịch nhận tiền bằng số tài khoản. Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách giao dịch nhận tiền thành công',
  })
  @ApiBadRequestResponse({
    description: 'Account không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin giao dịch nhận tiền bằng số tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER, Role.EMPLOYEE)
  @Get('list/received/:accountNumber')
  async getTransactionReceivedByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ) {
    const data =
      await this.transactionsService.getTransactionReceivedByAccountNumber(
        accountNumber,
      );

    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch nhận tiền thành công.',
    };
  }

  @ApiOperation({
    description: 'Lấy thông tin giao dịch chuyển khoản bằng số tài khoản',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách giao dịch chuyển khoản thành công',
  })
  @ApiBadRequestResponse({
    description: 'Account không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin giao dịch chuyển khoản bằng số tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER, Role.EMPLOYEE)
  @Get('list/transfer/:accountNumber')
  async getTransactionTransferByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ) {
    const data =
      await this.transactionsService.getTransactionTransferByAccountNumber(
        accountNumber,
      );

    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch chuyển khoản thành công.',
    };
  }

  @ApiOperation({
    description:
      'Lấy thông tin giao dịch nhắc nợ bằng số tài khoản. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Lấy danh sách giao dịch nhắc nợ thành công' })
  @ApiBadRequestResponse({
    description: 'Account không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin giao dịch nhắc nợ bằng số tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER, Role.EMPLOYEE)
  @Get('list/debtReminder/:accountNumber')
  async getTransactionDebtReminderByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ) {
    const data =
      await this.transactionsService.getTransactionDebtReminderByAccountNumber(
        accountNumber,
      );

    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch nhắc nợ thành công.',
    };
  }
}
