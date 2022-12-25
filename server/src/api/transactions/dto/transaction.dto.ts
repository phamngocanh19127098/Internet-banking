import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransferInternalDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000000002,
  })
  accountDesNumber: number;

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
  description: string;
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
