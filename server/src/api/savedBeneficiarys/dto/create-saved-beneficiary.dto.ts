import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateSavedBeneficiaryDto {
    @IsNotEmpty()
    @ApiProperty({default: "28169468817"})
    beneficiaryAccountNumber: string;
    @IsString()
    @ApiProperty({default: "Son nguyen"})
    beneficiaryNickname: string;
}

export class CreateSavedBeneficiaryAffiliatedDto {
    @IsNotEmpty()
    @ApiProperty({default: "48750494"})
    beneficiaryAccountNumber: string;
    @IsString()
    @ApiProperty({default: "Tan Solar"})
    beneficiaryNickname: string;
    @IsString()
    @ApiProperty({default: "Mai Ngoc Tan"})
    beneficiaryDefaultName: string;
    @IsNumber()
    @ApiProperty({default: 1001})
    beneficiaryBankId: number;
}
