import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavedBeneficiarysService } from './savedBeneficiarys.service';
import { CreateSavedBeneficiaryDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('savedBeneficiarys')
@Controller('savedBeneficiarys')
export class SavedBeneficiarysController {
  constructor(
    private readonly savedBeneficiarysService: SavedBeneficiarysService,
  ) {}

  @Post()
  async create(@Body() createSavedBeneficiaryDto: CreateSavedBeneficiaryDto) {
    const data = await this.savedBeneficiarysService.create(createSavedBeneficiaryDto);

    return {
      statusCode: 201,
      message: "Lưu người thụ hưởng thành công"
    }
  }

  @Get()
  async findAll() {
    const data = await this.savedBeneficiarysService.findAll();
    return{
      data,
      statusCode: 200,
      message: "Lấy toàn bộ thông tin người thụ hưởng thụ hưởng thành công"
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedBeneficiarysService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto,
  ) {
    const data = await this.savedBeneficiarysService.update(+id, updateSavedBeneficiaryDto);

    return {
      data,
      statusCode: 200,
      message: 'Cập nhật người thụ hưởng thành công',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.savedBeneficiarysService.remove(+id);

    return {
      statusCode: 200,
      message: 'Xoá người thụ hưởng thành công'
    }
  }
}
