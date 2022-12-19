import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import {User} from "../../users/entity/user.entity";

export enum OTPType {
    TRANSACTION = "transaction",
    FORGET_PW = "forget_pw"
}


@Entity({name : 'transaction'})
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @Column({ name: 'otp_code' })
    otpCode: string;

    @Column({ name: 'otp_type' })
    otpType: OTPType;

    @Column({ name: 'transaction_id' })
    transactionId: number;

    @Column({ name: 'created_at', type:"timestamp" })
    createdAt: Date;

}