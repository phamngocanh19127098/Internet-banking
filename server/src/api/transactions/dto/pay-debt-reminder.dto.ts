import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {PayTransactionFeeType} from "../entities/transaction.entity";

export class PayDebtReminderDto{
    @ApiProperty({
        description: "id của tài khoản chủ nợ",
        default: "1058",
    })
    @Allow()
    @IsNumber()
    toUserId: number;

    @ApiProperty({
        description: "số tiền cần chuyển",
        default: "1000000",
    })
    @Allow()
    @IsNumber()
    amount: number;

    @ApiProperty({
        required: false,
        example: 'Chuyển tiền nèe',
    })
    @Allow()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1000000002,
    })
    payTransactionFee: PayTransactionFeeType;

}