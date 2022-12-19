import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTransferOtpDto {
    constructor(customerId, transactionId, code) {
        this.customerId = customerId;
        this.transactionId = transactionId;
        this.otpCode = code
    }
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1000,
    })
    customerId: number;

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
        example: "123456",
    })
    otpCode: string;
}