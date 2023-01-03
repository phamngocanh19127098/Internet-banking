import { ApiProperty } from '@nestjs/swagger';
import {Allow, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {PayTransactionFeeType} from "../entities/transaction.entity";

export class CreateTransferDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1000000002,
    })
    accountDesNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000000002,
  })
  payTransactionFee: PayTransactionFeeType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 10000000,
  })
  amount: number;

  @ApiProperty({
    required: false,
    example: 'Chuyển tiền nèe',
  })
  @Allow()
  description: string;

  @Allow()
  bankDesId: number;


}

export class CreateTransferExternalDto
{
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  transactionInfo: CreateTransferDto;

  @IsString()
  @IsNotEmpty()
  msgToken: string;

  @IsNumber()
  @IsNotEmpty()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}



export class VerifyTransferInternalDto {
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
}
