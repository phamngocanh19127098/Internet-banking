import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AffiliatedBanksService } from './affiliatedBanks.service';
import { CreateAffiliatedBankDto } from './dto/create-affiliated-bank.dto';
import { UpdateAffiliatedBankDto } from './dto/update-affiliated-bank.dto';
import {Roles} from "../../commons/decorator/roles.decorator";
import {Role} from "../users/entity/user.entity";

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

  @Roles(Role.CUSTOMER)
  @Get()
  findAll() {
    return this.affiliatedBanksService.findAll();
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
