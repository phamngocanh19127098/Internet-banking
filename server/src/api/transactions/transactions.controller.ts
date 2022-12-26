import { TransactionType } from './enum/TransactionType.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers, Logger,
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
  CreateTransferInternalDto,
  VerifyTransferInternalDto,
} from './dto/transaction.dto';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import {NotConnectBankInfoException} from "../../commons/filters/exceptions/sercurity/NotConnectBankInfoException";
import verifyMessage from "../../commons/verify/VerifyMessage";
import {AffiliatedBanksService} from "../affiliatedBanks/affiliatedBanks.service";
import verifySignature from "../../commons/verify/VerifySignature";
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private affiliatedBanksService:AffiliatedBanksService
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Roles(Role.CUSTOMER)
  @Post('/internal/transfer')
  createTransferInternal(
    @Body() createTransferInternalDto: CreateTransferInternalDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.transactionsService.createTransferInternalRecord(
      createTransferInternalDto,
      authorization,
    );
  }

  @Roles(Role.CUSTOMER)
  @Post('/internal/transfer/verify')
  verifyTransferInternal(
    @Body() verifyTransferInternalDto: VerifyTransferInternalDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.transactionsService.verifyTransferInternalOtp(
      verifyTransferInternalDto,
      authorization,
    );
  }

  @Post('/external/transfer/verify')
  async createTransferExternal(
    @Body() dto: CreateTransferExternalDto,
  ) {
    const linkedBank = await this.affiliatedBanksService.findOneBySlug(dto.slug)
    if (!linkedBank)
      throw new NotConnectBankInfoException()
    let data = {
      ...dto.transactionInfo,
      accountDesNumber: dto.accountNumber
    }
    verifyMessage(dto.msgToken,data,dto.timestamp,linkedBank.secretKey)
    verifySignature(dto.signature,linkedBank.publicKey,linkedBank.cryptoType,data)
  }

  @Get()
  findAll(@Headers('origin') origin: string,) {
    Logger.log(origin)
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @Get('list/:accountNumber')
  @ApiOperation({ description: 'Lấy thông tin giao dịch bằng số tài khoản' })
  //http://localhost:3001/transactions/list/12345?type=TRANSFER test
  async getTransactionByAccountNumber(
    @Param('accountNumber') accountNumber: string,
    @Query() query,
  ) {
    let data = await this.transactionsService.getTransactionByAccountNumber(
      accountNumber,
      query.type,
    );
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch thành công.',
    };
  }
}
