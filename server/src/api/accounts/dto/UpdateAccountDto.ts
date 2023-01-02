import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { AccountStatus, AccountType } from '../entities/account.entity';

export class UpdateAccountDto {
  // @ApiProperty({
  //   description: 'Người tạo tài khoản này',
  //   required: false,
  //   example: 'user1000',
  // })
  // @Allow()
  // createdBy: number;

  @ApiProperty({
    description: 'Trạng thái tài khoản',
    required: false,
    example: '1',
  })
  @Allow()
  status: AccountStatus;

  @ApiProperty({
    description: 'Loại tài khoản',
    required: false,
    example: '1',
  })
  @Allow()
  accountType: AccountType;
}
