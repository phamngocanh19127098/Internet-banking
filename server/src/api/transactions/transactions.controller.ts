import { TransactionType } from './enum/TransactionType.enum';
import {
  ApiBadRequestResponse,
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
  CreateTransferInternalDto,
  VerifyTransferInternalDto,
} from './dto/transaction.dto';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import {NotConnectBankInfoException} from "../../commons/filters/exceptions/sercurity/NotConnectBankInfoException";
import verifyMessage from "../../commons/crypto/verify/VerifyMessage";
import {AffiliatedBanksService} from "../affiliatedBanks/affiliatedBanks.service";
import verifySignature from "../../commons/crypto/verify/VerifySignature";
import testSignature from "../../commons/crypto/testSign";
import testMsgToken from "../../commons/crypto/testMsgToken";
import createSignature from "../../commons/crypto/createSignature";
import RSAKey from "../../commons/crypto/getRSAKey";
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private affiliatedBanksService: AffiliatedBanksService,
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

  @Post('/external/order-for-payment')
  async createTransferExternal(@Body() dto: CreateTransferExternalDto) {
    const linkedBank = await this.affiliatedBanksService.findOneBySlug(
      dto.slug,
    );
    if (!linkedBank) throw new NotConnectBankInfoException();
    let data = {
      ...dto.transactionInfo,
      accountSrcNumber: dto.accountNumber,
      slug: dto.slug
    }
    verifyMessage(dto.msgToken,data,dto.timestamp,linkedBank.secretKey)
    verifySignature(dto.signature,linkedBank.publicKey,linkedBank.cryptoType,data)
    const newTrans = await this.transactionsService.createTransferExternalRecord(dto.transactionInfo,dto.accountNumber,linkedBank.id)
    const newTransInfor = {
      ...newTrans.data
    }
    return {
      ...newTrans,
      signature: createSignature(newTransInfor)
    }
  }

  @Get('/external/test-api')
  async testExternalApi(
  ) {
    const timestamp = (new  Date()).getTime();
    Logger.log(timestamp)
    let data = {
      accountNumber: '59025838490',
      slug: 'VIETCOMBANK'
    }
    const testToken = testMsgToken(data,timestamp,"d59zceEqyC")
    const testSign = testSignature(data)
    return { testToken, testSign}

  }

  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Lấy danh sách các giao dịch' })
  @ApiOkResponse({
    description: 'Lấy danh sách các giao dịch thành công',
  })
  @ApiBadRequestResponse({
    description: 'Không tồn tại ngân hàng cần đối soát',
  })
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
