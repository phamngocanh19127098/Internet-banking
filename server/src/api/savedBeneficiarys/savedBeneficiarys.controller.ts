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
import { CreateSavedBeneficiaryDto, CreateSavedBeneficiaryAffiliatedDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../commons/decorator/user.decorator';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist';

@ApiTags('savedBeneficiarys')
@Controller('savedBeneficiarys')
export class SavedBeneficiarysController {
  constructor(
    private readonly savedBeneficiarysService: SavedBeneficiarysService,
  ) { }

  @ApiOperation({ description: 'Lưu người thụ hưởng, Customer mới dùng được.' })
  @ApiCreatedResponse({ description: 'Lưu người thụ hưởng thành công' })
  @ApiBadRequestResponse({
    description: 'Tài khoản không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lưu người thụ hưởng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Post()
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

  @ApiOperation({
    description: 'Lấy danh sách người thụ hưởng. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Lấy danh sách người thụ hưởng thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách người thụ hưởng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('list/:userId')
  async findAll(@Param('userId') userId: string) {
    const data = await this.savedBeneficiarysService.findAll(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách người thụ hưởng thành công',
    };
  }

  @ApiOperation({
    description:
      'Lấy thông tin người thụ hưởng thụ hưởng, Customer mới dùng được.',
  })
  @ApiOkResponse({
    description: 'Lấy thông tin người thụ hưởng thụ hưởng thành công',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Xảy ra lỗi từ server khi lấy thông tin người thụ hưởng thụ hưởng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.savedBeneficiarysService.findOne(+id);
    return {
      data,
      statusCode: 200,
      message: 'Lấy thông tin người thụ hưởng thụ hưởng thành công',
    };
  }

  @ApiOperation({
    description: 'Cập nhật người thụ hưởng. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Cập nhật người thụ hưởng thành công' })
  @ApiBadRequestResponse({
    description: 'Người thụ hưởng không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi cập nhật người thụ hưởng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
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

  @ApiOperation({ description: 'Xoá người thụ hưởng. Customer mới dùng được.' })
  @ApiOkResponse({ description: 'Xoá người thụ hưởng thành công' })
  @ApiBadRequestResponse({
    description: 'Người thụ hưởng không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi Xoá người thụ hưởng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.savedBeneficiarysService.remove(+id);

    return {
      data: {},
      statusCode: 200,
      message: 'Xoá người thụ hưởng thành công',
    };
  }

  @ApiOperation({ description: 'Lưu người thụ hưởng Liên ngân hàng, Customer mới dùng được.' })
  @ApiCreatedResponse({ description: 'Lưu người thụ hưởng Liên ngân hàng thành công' })
  @ApiBadRequestResponse({
    description: 'Tài khoản không tồn tại',
  })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lưu người thụ hưởng Liên ngân hàng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Post('affiliatedBank')
  async createBenificiatyAffiliated(
    @User() user,
    @Body() createSavedBeneficiaryDto: CreateSavedBeneficiaryAffiliatedDto,
  ) {
    const data = await this.savedBeneficiarysService.createBenificiatyAffiliated(
      createSavedBeneficiaryDto,
      user.id,
    );

    return {
      data,
      statusCode: 201,
      message: 'Lưu người thụ hưởng Liên ngân hàng thành công',
    };
  }



  @ApiOperation({
    description: 'Lấy danh sách người thụ hưởng liên ngân hàng. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Lấy danh sách người thụ hưởng liên ngân hàng thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách người thụ hưởng liên ngân hàng',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('list/affiliated/:userId')
  async findAllAffiliated(@Param('userId') userId: string) {
    const data = await this.savedBeneficiarysService.findAllAffiliated(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách người thụ hưởng liên ngân hàng thành công',
    };
  }




  @ApiOperation({
    description: 'Lấy danh sách người thụ hưởngn nội bộ. Customer mới dùng được.',
  })
  @ApiOkResponse({ description: 'Lấy danh sách người thụ hưởng nội bộ thành công' })
  @ApiForbiddenResponse({
    description: 'Vai trò của bạn không thể dùng tính năng này',
  })
  @ApiUnauthorizedResponse({
    description: 'Không có quyền dùng tính năng này',
  })
  @ApiInternalServerErrorResponse({
    description: 'Xảy ra lỗi từ server khi lấy danh sách người thụ hưởng nội bộ',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @Get('list/external/:userId')
  async findAllExternal(@Param('userId') userId: string) {
    const data = await this.savedBeneficiarysService.findAllExternal(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách người thụ hưởng nội bộ thành công',
    };
  }


}
