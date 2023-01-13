import {IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSavedBeneficiaryDto {
    @IsString()
    @ApiProperty({default: "Nguyen Son"})
    beneficiaryDefaultName: string;
    @IsString()
    @ApiProperty({default: "Son"})
    beneficiaryNickname: string;
    @IsString()
    @ApiProperty({default: "28169468817"})
    beneficiaryAccountNumber: string;
}
