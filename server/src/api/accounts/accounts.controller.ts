import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import { UserService } from '../users/user.service';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/CreateAccountDto';
import { DepositIntoAccountDto } from './dto/DepositIntoAccountDto';
import { UpdateAccountDto } from './dto/UpdateAccountDto';
import {GetAccountInfoExternalDto} from "./dto/accountExternal.dto";
import verifyMessage from "../../commons/crypto/verify/VerifyMessage";
import {AffiliatedBanksService} from "../affiliatedBanks/affiliatedBanks.service";
import {NotConnectBankInfoException} from "../../commons/filters/exceptions/sercurity/NotConnectBankInfoException";

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private userService: UserService,
    private affiliatedBanksService: AffiliatedBanksService
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Roles(Role.EMPLOYEE)
  @Put('/deposit')
  async depositIntoAccount(@Body() dto: DepositIntoAccountDto) {
    if (dto.accountNumber) {
      return this.accountsService.depositByAccountNumber(
        dto.accountNumber,
        dto.depositMoney,
      );
    }

    if (dto.username) {
      return this.accountsService.depositByUsername(
        dto.username,
        dto.depositMoney,
      );
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.accountsService.remove(id);
  }

  @Roles(Role.CUSTOMER)
  @Get('/list/:userId')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Lấy danh sách tài khoản ngân hàng bằng userId',
  })
  async getAllByUserId(@Param('userId') userId: number) {
    const data = await this.accountsService.getListAccountByUserId(userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách thông tin tài khoản thành công.',
    };
  }

  @Get('/detail/:accountNumber')
  @ApiOperation({ description: 'Lấy thông tin người dùng bằng số tài khoản' })
  async getAccountInfoByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ) {
    let data = await this.accountsService.getAccountInfoByAccountNumber(
      accountNumber,
    );
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin tài khoản thành công.',
    };
  }

  @Post('/external/get-info')
  @ApiOperation({ description: 'Lấy thông tin người dùng bằng số tài khoản' })
  async getAccountInfoExternalByAccountNumber(
    @Body() dto: GetAccountInfoExternalDto,
  ) {
    const linkedBank = await this.affiliatedBanksService.findOneBySlug(dto.slug)
    if (!linkedBank)
      throw new NotConnectBankInfoException()
    let data = {
      accountNumber: dto.accountNumber,
      slug: dto.slug
    }
    verifyMessage(dto.msgToken,data,dto.timestamp,linkedBank.secretKey)
    return this.accountsService.getAccountNameByAccountNumber(dto.accountNumber)
  }
}
