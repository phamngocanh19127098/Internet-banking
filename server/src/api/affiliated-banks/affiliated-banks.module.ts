import { Module } from '@nestjs/common';
import { AffiliatedBanksService } from './affiliated-banks.service';
import { AffiliatedBanksController } from './affiliated-banks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AffiliatedBank} from "./entities/affiliated-bank.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AffiliatedBank])],
  controllers: [AffiliatedBanksController],
  providers: [AffiliatedBanksService]
})
export class AffiliatedBanksModule {}
