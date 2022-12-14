import { PartialType } from '@nestjs/swagger';
import { CreateAffiliatedBankDto } from './create-affiliated-bank.dto';

export class UpdateAffiliatedBankDto extends PartialType(CreateAffiliatedBankDto) {}
