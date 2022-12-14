import { Injectable } from '@nestjs/common';
import { CreateAffiliatedBankDto } from './dto/create-affiliated-bank.dto';
import { UpdateAffiliatedBankDto } from './dto/update-affiliated-bank.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AffiliatedBank} from "./entities/affiliated-bank.entity";

@Injectable()
export class AffiliatedBanksService {
  constructor(
      @InjectRepository(AffiliatedBank)
      private repos: Repository<AffiliatedBank>,
  ) {}
  create(createAffiliatedBankDto: CreateAffiliatedBankDto) {
    return 'This action adds a new affiliatedBank';
  }

  findAll() {
    return this.repos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} affiliatedBank`;
  }

  update(id: number, updateAffiliatedBankDto: UpdateAffiliatedBankDto) {
    return `This action updates a #${id} affiliatedBank`;
  }

  remove(id: number) {
    return `This action removes a #${id} affiliatedBank`;
  }
}
