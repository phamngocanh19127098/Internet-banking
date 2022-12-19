import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, ROLES_KEY } from 'src/commons/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import { RolesGuard } from 'src/commons/guard/roles.guard';
import { Role } from '../users/entity/user.entity';
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

  @Roles(Role.CUSTOMER)
  @Get('/list/:userId')
  @ApiBearerAuth()
  @ApiOperation({description: "Lấy danh sách tài khoản ngân hàng bằng userId"})
  async getAllByUserId (@Param('userId') userId: string) {
    
    let data = await this.accountsService.getListAccountByUserId(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách thông tin tài khoản thành công.'
    }
  }

  @Get('/detail/:accountNumber')
  @Roles(Role.CUSTOMER)
  @ApiOperation({description: "Lấy thông tin người dùng bằng số tài khoản"})
  async getAccountInfoByAccountNumber(@Param('accountNumber') accountNumber: string){
    let data = await this.accountsService.getAccountInfoByAccountNumber(accountNumber);
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin tài khoản thành công.'
    }
  }

}
