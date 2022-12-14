import { Injectable } from '@nestjs/common';
import { CreateSavedBeneficiaryDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SavedBeneficiary} from "./entities/savedBeneficiary.entity";

@Injectable()
export class SavedBeneficiarysService {
  constructor(
      @InjectRepository(SavedBeneficiary)
      private repos: Repository<SavedBeneficiary>) {
  }
  create(createSavedBeneficiaryDto: CreateSavedBeneficiaryDto) {
    return 'This action adds a new savedBeneficiary';
  }

  findAll() {
    return this.repos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} savedBeneficiary`;
  }

  update(id: number, updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto) {
    return `This action updates a #${id} savedBeneficiary`;
  }

  remove(id: number) {
    return `This action removes a #${id} savedBeneficiary`;
  }
}
