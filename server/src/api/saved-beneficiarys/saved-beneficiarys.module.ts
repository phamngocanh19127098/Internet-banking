import { Module } from '@nestjs/common';
import { SavedBeneficiarysService } from './saved-beneficiarys.service';
import { SavedBeneficiarysController } from './saved-beneficiarys.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SavedBeneficiary} from "./entities/saved-beneficiary.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SavedBeneficiary])],
  controllers: [SavedBeneficiarysController],
  providers: [SavedBeneficiarysService]
})
export class SavedBeneficiarysModule {}
