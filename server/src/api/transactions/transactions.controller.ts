import {TransactionType} from "./enum/TransactionType.enum";
import {ApiOperation} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query} from '@nestjs/common';
import {TransactionsService} from './transactions.service';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {CreateTransferInternalDto} from "./dto/transaction.dto";
import {Roles} from "../../commons/decorator/roles.decorator";
import {Role} from "../users/entity/user.entity";

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Roles(Role.CUSTOMER)
  @Post("/internal/transfer")
  createTransferInternal(@Body() createTransferInternalDto: CreateTransferInternalDto,
                         @Headers('authorization') authorization: string,) {
    return this.transactionsService.createTransferInternalRecord(createTransferInternalDto,authorization);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }

  @Get('list/:accountNumber')
  @ApiOperation({description: "Lấy thông tin giao dịch bằng số tài khoản"})
  //http://localhost:3001/transactions/list/12345?type=TRANSFER test
  async getTransactionByAccountNumber(@Param('accountNumber') accountNumber: string,@Query() query){
    let data = await this.transactionsService.getTransactionByAccountNumber(
      accountNumber,
      query.type,
    );
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin giao dịch thành công.',
    }
  }
}
