import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class DepositIntoAccountDto {
  @ApiProperty({
    description: 'username',
    required: false,
    example: 'customer',
  })
  @Allow()
  username?: string;

  @ApiProperty({
    description: 'số tài khoản',
    required: false,
    example: '59025838490',
  })
  @Allow()
  accountNumber?: string;

  @ApiProperty({
    description: 'số tiền cần nạp',
    required: true,
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  depositMoney: number;
}
