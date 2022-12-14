import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavedBeneficiarysService } from './saved-beneficiarys.service';
import { CreateSavedBeneficiaryDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';

@Controller('saved-beneficiarys')
export class SavedBeneficiarysController {
  constructor(
    private readonly savedBeneficiarysService: SavedBeneficiarysService,
  ) {}

  @Post()
  create(@Body() createSavedBeneficiaryDto: CreateSavedBeneficiaryDto) {
    return this.savedBeneficiarysService.create(createSavedBeneficiaryDto);
  }

  @Get()
  findAll() {
    return this.savedBeneficiarysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedBeneficiarysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto) {
    return this.savedBeneficiarysService.update(+id, updateSavedBeneficiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedBeneficiarysService.remove(+id);
  }
}
