import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class DepositIntoAccountDto {
  @Allow()
  username?: string;

  @Allow()
  accountNumber?: string;

  @IsNotEmpty()
  @IsNumber()
  depositMoney: number;
}
