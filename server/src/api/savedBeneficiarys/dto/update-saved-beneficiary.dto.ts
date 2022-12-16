import {IsString} from "class-validator";

export class UpdateSavedBeneficiaryDto {
    @IsString()
    beneficiaryDefaultName: string;
    @IsString()
    beneficiaryNickname: string;
    @IsString()
    beneficiaryAccountNumber: string;
}
