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
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { User } from '../../commons/decorator/user.decorator';
import { Roles } from '../../commons/decorator/roles.decorator';
import { Role } from '../users/entity/user.entity';

@ApiTags('savedBeneficiarys')
@Controller('savedBeneficiarys')
export class SavedBeneficiarysController {
  constructor(
    private readonly savedBeneficiarysService: SavedBeneficiarysService,
  ) {}

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

  @Get('list/:userId')
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  async findAll(@Param('userId') userId: string) {
    const data = await this.savedBeneficiarysService.findAll(+userId);
    return {
      data,
      statusCode: 200,
      message: 'Lấy danh sách người thụ hưởng thụ hưởng thành công',
    };
  }

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
