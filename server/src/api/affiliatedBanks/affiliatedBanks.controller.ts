import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AffiliatedBanksService } from './affiliatedBanks.service';
import { CreateAffiliatedBankDto } from './dto/create-affiliated-bank.dto';
import { UpdateAffiliatedBankDto } from './dto/update-affiliated-bank.dto';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';

@ApiTags('affiliatedBanks')
@Controller('affiliatedBanks')
export class AffiliatedBanksController {
  constructor(
    private readonly affiliatedBanksService: AffiliatedBanksService,
  ) {}

  @Post()
  create(@Body() createAffiliatedBankDto: CreateAffiliatedBankDto) {
    return this.affiliatedBanksService.create(createAffiliatedBankDto);
  }

  @Get()
  @ApiOperation({
    description:
      'Lấy danh sách ngân hàng đã liên kết. Vai trò nào cũng dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách ngân hàng đã liên kết thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không được dùng tính năng này',
  })
  @ApiUnauthorizedResponse({ description: 'Không có quyền dùng tính năng này' })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách ngân hàng đã liên kết',
  })
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.EMPLOYEE)
  async findAll() {
    const data = await this.affiliatedBanksService.findAll();
    return {
      statusCode: 200,
      message: 'Lấy danh sách ngân hàng liên kết thành công',
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliatedBanksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffiliatedBankDto: UpdateAffiliatedBankDto,
  ) {
    return this.affiliatedBanksService.update(+id, updateAffiliatedBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliatedBanksService.remove(+id);
  }
}
