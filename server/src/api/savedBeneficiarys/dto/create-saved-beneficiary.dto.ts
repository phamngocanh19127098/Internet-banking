import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSavedBeneficiaryDto {
    @IsNotEmpty()
    beneficiaryAccountNumber: string;
    @IsString()
    beneficiaryNickname: string;
}

export class CreateSavedBeneficiaryAffiliatedDto {
    @IsNotEmpty()
    beneficiaryAccountNumber: string;
    @IsString()
    beneficiaryNickname: string;
    @IsString()
    beneficiaryDefaultName: string;
    @IsNumber()
    beneficiaryBankId: number;
}
