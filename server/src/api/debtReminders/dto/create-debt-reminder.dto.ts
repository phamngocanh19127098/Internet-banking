import { ApiProperty } from "@nestjs/swagger";
import {Allow, IsNumber, IsString} from "class-validator";

export class CreateDebtReminderDto {
    @IsString()
    @ApiProperty({default: "12345"})
    accountDesNumber: string;

    @IsNumber()
    @ApiProperty({default: 100000})
    amount: number;

    @IsString()
    @ApiProperty({ default: "tien mua nha"})
    description: string;

    @IsString()
    @ApiProperty({default: 1039})
    userId : string;

}
