import { Module } from '@nestjs/common';
import { AffiliatedBanksService } from './affiliatedBanks.service';
import { AffiliatedBanksController } from './affiliatedBanks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AffiliatedBank} from "./entities/affiliatedBank.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AffiliatedBank])],
  controllers: [AffiliatedBanksController],
  providers: [AffiliatedBanksService]
})
export class AffiliatedBanksModule {}
