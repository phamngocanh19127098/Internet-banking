import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAccountInfoDto {
  @ApiProperty({
    description: 'Số tài khoản',
    required: true,
    example: '59025838490',
  })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @Allow()
  bankDesId: number;
}
