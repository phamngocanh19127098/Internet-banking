import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class GetAccountInfoExternalDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsNumber()
  @IsNotEmpty()
  timestamp: number;

  @IsString()
  @IsNotEmpty()
  msgToken: string;

  @IsString()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}