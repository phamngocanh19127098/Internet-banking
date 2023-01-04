import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class GetAccountInfoExternalDto {
  @ApiProperty({
    description: 'Số tài khoản',
    required: true,
    example: '59025838490',
  })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    description: 'Timestamp cần để verify thông tin request đã  quá hạn hay chưa',
    required: true,
    example: 1672846755688,
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  timestamp: number;

  @ApiProperty({
    description: 'Token verify ngân hàng đã được liên kết hay chưa, và thông tin request có nguyên vẹn không',
    required: true,
    example: '1b3bc6d214b065ed2c740b028e3e3849',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  msgToken: string;

  @ApiProperty({
    description: 'Mã code của ngân hàng liên kết',
    required: true,
    example: 'SLB',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
