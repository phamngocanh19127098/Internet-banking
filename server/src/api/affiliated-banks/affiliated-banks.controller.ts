import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AffiliatedBanksService } from './affiliated-banks.service';
import { CreateAffiliatedBankDto } from './dto/create-affiliated-bank.dto';
import { UpdateAffiliatedBankDto } from './dto/update-affiliated-bank.dto';

@Controller('affiliated-banks')
export class AffiliatedBanksController {
  constructor(
    private readonly affiliatedBanksService: AffiliatedBanksService,
  ) {}

  @Post()
  create(@Body() createAffiliatedBankDto: CreateAffiliatedBankDto) {
    return this.affiliatedBanksService.create(createAffiliatedBankDto);
  }

  @Get()
  findAll() {
    return this.affiliatedBanksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliatedBanksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffiliatedBankDto: UpdateAffiliatedBankDto) {
    return this.affiliatedBanksService.update(+id, updateAffiliatedBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliatedBanksService.remove(+id);
  }
}
