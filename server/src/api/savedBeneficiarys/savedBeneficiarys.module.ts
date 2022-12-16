import { Module } from '@nestjs/common';
import { SavedBeneficiarysService } from './savedBeneficiarys.service';
import { SavedBeneficiarysController } from './savedBeneficiarys.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SavedBeneficiary} from "./entities/savedBeneficiary.entity";
import {Account} from "../accounts/entities/account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SavedBeneficiary, Account])],
  controllers: [SavedBeneficiarysController],
  providers: [SavedBeneficiarysService]
})
export class SavedBeneficiarysModule {}
