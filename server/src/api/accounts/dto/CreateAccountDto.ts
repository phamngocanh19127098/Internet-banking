import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  currentBalance: number;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
