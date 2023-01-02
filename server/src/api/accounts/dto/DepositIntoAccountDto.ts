import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class DepositIntoAccountDto {
  // @ApiProperty({
  //   description: 'Tên đăng nhập của tài khoản',
  //   required: false,
  //   example: 'customer',
  // })
  @Allow()
  username?: string;

  @ApiProperty({
    description: 'Số tài khoản',
    required: false,
    example: '59025838490',
  })
  @Allow()
  accountNumber?: string;

  @ApiProperty({
    description: 'Số tiền cần nạp',
    required: true,
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  depositMoney: number;
}
