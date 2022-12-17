import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetListDto } from './dto/get-list-dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  @Get('/list/:userId')
  async getAllByUserId (@Param('userId') userId: string, @Query('page') page: string, @Query('perPage') perPage: string) {
    
    let data = await this.accountsService.getListAccountByUserId(+userId, +page, +perPage);
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin tài khoản thành công.'
    }
  }
}
