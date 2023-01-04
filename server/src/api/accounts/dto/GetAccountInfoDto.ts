import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAccountInfoDto {
  @ApiProperty({
    description: 'Số tài khoản',
    required: true,
    example: '59025838490',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    description: 'Id của ngân hàng liên kết, nếu nội bộ không cần truyền',
    required: false,
    example: 1001,
    type: Number
  })
  @Allow()
  bankDesId: number;
}
