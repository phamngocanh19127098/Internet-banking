import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  slug: string;
}
