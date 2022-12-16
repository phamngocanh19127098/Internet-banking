import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSavedBeneficiaryDto {
    @IsNotEmpty()
    beneficiaryAccountNumber: string;
    @IsString()
    beneficiaryNickname: string;
}
