import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {TransactionType} from "./enum/TransactionType.enum";
import {ApiOperation} from "@nestjs/swagger";

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
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
  async getTransactionByAccountNumber(@Param('accountNumber') accountNumber: string){
    let data = await this.transactionsService.getTransactionByAccountNumber(
      accountNumber,
      TransactionType.TRANSFER,
    );
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin tài khoản thành công.'
    }
  }
}
