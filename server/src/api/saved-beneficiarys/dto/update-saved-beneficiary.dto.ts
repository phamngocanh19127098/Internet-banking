import { PartialType } from '@nestjs/swagger';
import { CreateSavedBeneficiaryDto } from './create-saved-beneficiary.dto';

export class UpdateSavedBeneficiaryDto extends PartialType(CreateSavedBeneficiaryDto) {}
