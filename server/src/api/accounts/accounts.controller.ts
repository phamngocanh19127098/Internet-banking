import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from 'src/commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import { UserService } from '../users/user.service';
import { AccountsService } from './accounts.service';
import { DepositIntoAccountDto } from './dto/DepositIntoAccountDto';
import { UpdateAccountDto } from './dto/UpdateAccountDto';
import { GetAccountInfoExternalDto } from './dto/GetAccountInfoExternalDto';
import verifyMessage from '../../commons/crypto/verify/VerifyMessage';
import { AffiliatedBanksService } from '../affiliatedBanks/affiliatedBanks.service';
import { NotConnectBankInfoException } from '../../commons/filters/exceptions/sercurity/NotConnectBankInfoException';
import { GetAccountInfoDto } from './dto/GetAccountInfoDto';
import SolarBankService, {
  SOLAR_BANK_CODE,
} from '../../client/SolarBank/SolarBank.service';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private userService: UserService,
    private affiliatedBanksService: AffiliatedBanksService,
  ) {}

  // @Post()
  // create(@Body() createAccountDto: CreateAccountDto) {
  //   return this.accountsService.create(createAccountDto);
  // }

  @ApiOperation({ description: 'Lấy tất cả tài khoản' })
  @ApiOkResponse({ description: 'Lấy tất cả tài khoản thành công' })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy tất cả tài khoản',
  })
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @ApiOperation({
    description:
      'Nạp tiền vào tài khoản. Employee mới dùng được. Trước khi Execute thì xoá 1 trong 2 field username hoặc accountNumber',
  })
  @ApiOkResponse({ description: 'Nạp tiền vào tài khoản thành công' })
  @ApiBadRequestResponse({
    description: 'Sai username hoặc sai số tài khoản hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi nạp tiền vào tài khoản',
  })
  @ApiBearerAuth()
  @Roles(Role.EMPLOYEE)
  @Put('/deposit')
  async depositIntoAccount(@Body() dto: DepositIntoAccountDto) {
    if (dto.accountNumber) {
      const account = await this.accountsService.depositByAccountNumber(
        dto.accountNumber,
        dto.depositMoney,
      );

      return {
        data: account,
        statusCode: 200,
        message: 'Nạp tiền thành công.',
      };
    }

    if (dto.username) {
      const account = await this.accountsService.depositByUsername(
        dto.username,
        dto.depositMoney,
      );

      return {
        data: account,
        statusCode: 200,
        message: 'Nạp tiền thành công.',
      };
    }
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountsService.update(id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.accountsService.remove(id);
  // }

  @ApiOperation({
    description:
      'Lấy danh sách tài khoản ngân hàng bằng userId. Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách tài khoản ngân hàng bằng userId thành công',
  })
  @ApiBadRequestResponse({
    description: 'Sai userId hoặc sai kiểu dữ liệu',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy danh sách tài khoản ngân hàng bằng userId',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('/list/:userId')
  async getAllByUserId(@Param('userId') userId: number) {
    const data = await this.accountsService.getListAccountByUserId(userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách thông tin tài khoản thành công.',
    };
  }

  @ApiOperation({
    description: 'Lấy thông tin tài khoản bằng số tài khoản',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin tài khoản bằng số tài khoản thành công',
  })
  @ApiBadRequestResponse({
    description: 'Sai số tài khoản hoặc sai kiểu dữ liệu',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin tài khoản bằng số tài khoản',
  })
  @Get('/detail/:accountNumber')
  async getAccountInfoByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ) {
    const data = await this.accountsService.getAccountInfoByAccountNumber(
      accountNumber,
    );
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin tài khoản thành công.',
    };
  }

  // Api documentation
  @ApiOperation({ description: 'Lấy thông tin người dùng bằng số tài khoản' })
  @ApiOkResponse({
    description: 'Lấy thông tin người dùng bằng số tài khoản thành công.',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin tài khoản bằng số tài khoản',
  })
  @Post('/get-info')
  async getAccountNameByAccountNumber(@Body() dto: GetAccountInfoDto) {
    if (!dto.bankDesId) {
      return this.accountsService.getAccountNameByAccountNumber(
        dto.accountNumber,
      );
    } else {
      const linkedBank = await this.affiliatedBanksService.findOne(
        dto.bankDesId,
      );
      if (!linkedBank) throw new NotConnectBankInfoException();
      if (linkedBank.slug === SOLAR_BANK_CODE) {
        return SolarBankService.getAccountInfo(dto.accountNumber);
      }
    }
  }

  @ApiOperation({
    description: 'Truy vấn thông tin tài khoản từ liên ngân hàng',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin tài khoản thành công.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Lỗi trong quá trình lấy thông tin người dùng',
  })
  @Post('/external/get-info')
  async getAccountInfoExternalByAccountNumber(
    @Body() dto: GetAccountInfoExternalDto,
  ) {
    const linkedBank = await this.affiliatedBanksService.findOneBySlug(
      dto.slug,
    );
    if (!linkedBank) throw new NotConnectBankInfoException();
    const data = {
      accountNumber: dto.accountNumber,
      slug: dto.slug,
    };
    verifyMessage(dto.msgToken, data, dto.timestamp, linkedBank.secretKey);
    return this.accountsService.getAccountNameByAccountNumber(
      dto.accountNumber,
    );
  }
}
