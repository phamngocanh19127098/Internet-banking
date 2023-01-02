import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsNumber} from "class-validator";

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
}