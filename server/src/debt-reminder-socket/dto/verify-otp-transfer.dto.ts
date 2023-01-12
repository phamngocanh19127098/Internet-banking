import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyOtpTransferDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
      required: true,
      example: 1000,
    })
    transactionId: number;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      required: true,
      example: '123456',
    })
    otpCode: string;

    @Allow()
    @IsString()
    @ApiProperty({default: ""})
    authorization : string;
}