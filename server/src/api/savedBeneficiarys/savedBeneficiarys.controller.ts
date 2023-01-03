import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SavedBeneficiarysService } from './savedBeneficiarys.service';
import { CreateSavedBeneficiaryDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { User } from '../../commons/decorator/user.decorator';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import {ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse} from "@nestjs/swagger/dist";

@ApiTags('savedBeneficiarys')
@Controller('savedBeneficiarys')
export class SavedBeneficiarysController {
  constructor(
    private readonly savedBeneficiarysService: SavedBeneficiarysService,
  ) {}

  @ApiOperation({ description: 'Lưu người thụ hưởng' })
  @ApiCreatedResponse({ description: 'Lưu người thụ hưởng thành công'})
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Lưu người thụ hưởng',
  })
  @ApiBadRequestResponse({
    description: 'Tài khoản không tồn tại',
  })
  @Post()
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  async create(
    @User() user,
    @Body() createSavedBeneficiaryDto: CreateSavedBeneficiaryDto,
  ) {
    const data = await this.savedBeneficiarysService.create(
      createSavedBeneficiaryDto,
      user.id,
    );

    return {
      data,
      statusCode: 201,
      message: 'Lưu người thụ hưởng thành công',
    };
  }

  @ApiOperation({ description: 'Lấy danh sách người thụ hưởng' })
  @ApiOkResponse({ description: 'Lấy danh sách người thụ hưởng thành công'})
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Lấy danh sách người thụ hưởng',
  })
  @Get('list/:userId')
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  async findAll(@Param('userId') userId: string) {
    const data = await this.savedBeneficiarysService.findAll(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách người thụ hưởng thành công',
    };
  }

  @ApiOperation({ description: 'Lấy thông tin người thụ hưởng thụ hưởng' })
  @ApiOkResponse({ description: 'Lấy thông tin người thụ hưởng thụ hưởng thành công'})
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Lấy thông tin người thụ hưởng thụ hưởng',
  })
  @Get(':id')
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const data = await this.savedBeneficiarysService.findOne(+id);
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin người thụ hưởng thụ hưởng thành công',
    };
  }

  @ApiOperation({ description: 'Cập nhật người thụ hưởng' })
  @ApiOkResponse({ description: 'Cập nhật người thụ hưởng thành công'})
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Cập nhật người thụ hưởng',
  })
  @ApiBadRequestResponse({
    description: 'Người thụ hưởng không tồn tại',
  })
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto,
  ) {
    const data = await this.savedBeneficiarysService.update(
      +id,
      updateSavedBeneficiaryDto,
    );

    return {
      data,
      statusCode: 200,
      message: 'Cập nhật người thụ hưởng thành công',
    };
  }

  @ApiOperation({ description: 'Xoá người thụ hưởng' })
  @ApiOkResponse({ description: 'Xoá người thụ hưởng thành công'})
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Xoá người thụ hưởng',
  })
  @ApiBadRequestResponse({
    description: 'Người thụ hưởng không tồn tại',
  })
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.savedBeneficiarysService.remove(+id);

    return {
      data: {},
      statusCode: 200,
      message: 'Xoá người thụ hưởng thành công',
    };
  }
}
