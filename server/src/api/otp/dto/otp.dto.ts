import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTransferOtpDto {
  constructor(customerId: number, transactionId: number, code: string) {
    this.customerId = customerId;
    this.transactionId = transactionId;
    this.otpCode = code;
  }

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000,
  })
  customerId: number;

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

export class CreateForgotPasswordOtpDto {
  constructor(customerId: number, code: string) {
    this.customerId = customerId;
    this.otpCode = code;
  }

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000,
  })
  customerId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123456',
  })
  otpCode: string;
}

export class VerifyForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123456',
  })
  otpCode: string;
}
