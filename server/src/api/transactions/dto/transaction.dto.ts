import { ApiProperty } from '@nestjs/swagger';
import {Allow, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {PayTransactionFeeType} from "../entities/transaction.entity";

export class CreateTransferDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: 'Số tài khoản người nhận',
      required: true,
      example: '59025838490',
    })
    accountDesNumber: string;

  @ApiProperty({
    description: 'Người chịu phí chuyển khoản (SRC: người gửi, DES: người nhận)',
    required: true,
    example: 'SRC',
  })
  @IsString()
  @IsNotEmpty()
  payTransactionFee: PayTransactionFeeType;

  @ApiProperty({
    description: 'Số tiền cần chuyển',
    required: true,
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    required: false,
    example: 'Chuyển tiền nèe',
  })
  @Allow()
  description: string;

  @ApiProperty({
    description: 'Id của liên ngân hàng, nếu chuyển khoản nội bộ thì không cần truyền',
    required: false,
    example: 1001,
  })
  @Allow()
  bankDesId: number;


}

export class CreateTransferExternalDto
{
  @ApiProperty({
    description: 'Số tài khoản người gửi',
    required: true,
    example: '01325183',
  })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    description: 'Thông tin giao dịch chuyển khoản',
    required: true,
    type: Object,
    example: {
      accountDesNumber: "23875338674",
      amount: 50000,
      description: "Transfer Money SLB",
      payTransactionFee: "SRC",
      accountSrcNumber: "28069884",
      slug: "SLB"
    }
  })
  @IsNotEmpty()
  transactionInfo: CreateTransferDto;

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

  @ApiProperty({
    description: 'Chữ ký của liên ngân hàng',
    required: true,
    example: '48ed6dfc77debccca72cf3b1a7a6ffc4efc913915882a63a670e69e9e5b1572d0b5a3d2c24530161e196d43f849731dc98e083036c451855b663228a9f8d219d6d8e9e227683e390c5955f4d1e93b640d675c35c63c7b75ccab17ad00dba472342d56901116a341ff496dcb4250c389aa0a95e252f5bdebfc2e0cb791bc2c656'
  })
  @IsString()
  @IsNotEmpty()
  signature: string;
}



export class VerifyTransferInternalDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 1000,
  })
  transactionId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '123456',
  })
  otpCode: string;
}
