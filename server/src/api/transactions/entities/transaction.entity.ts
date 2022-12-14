import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import {User} from "../../users/entity/user.entity";
import {Account} from "../../accounts/entities/account.entity";
import {AffiliatedBank} from "../../affiliatedBanks/entities/affiliatedBank.entity";

export enum TransactionType {
  RECHARGE = "RECHARGE",
  TRANSFER = "TRANSFER",
  DEBT_REMINDERS_PAYMENT = "DEBT_REMINDERS_PAYMENT",
  RECEIVE = "RECEIVE"
}
export enum TransactionStatus {
  SUCCESS = 1,
  UN_SUCCESS = 0,
}

export enum PayTransactionFeeType {
  SRC = 'SRC',
  DES = 'DES',
}

@Entity({name : 'transaction'})
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_des_number' })
  accountDesNumber: string;

  @Column({ name: 'account_src_number' })
  accountSrcNumber: string;

  @Column()
  amount: number;

  @Column({ name: 'bank_des_id' })
  bankDesId: number;

  @Column({ name: 'pay_transaction_fee' })
  payTransactionFee: PayTransactionFeeType;

  @Column()
  description: string;

  @Column({ name: 'employee_id' })
  employeeId: number; // number ???

  @Column({ name: 'transaction_type' })
  transactionType: TransactionType;

  @Column()
  status: TransactionStatus;

  @Column({ name: 'created_at', type:"timestamp" })
  createdAt: Date;

  @Column({ name: 'updated_at' ,type:"timestamp"})
  updatedAt: Date;

  @Column({name: 'user_id'})
  userId: number;

  @OneToOne(() => User, (user) => user.transactions)
  @JoinColumn({name: 'user_id', referencedColumnName : 'id'})
  user: User;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_des_number', referencedColumnName: 'accountNumber'})
  accountDes: Account;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_src_number', referencedColumnName: 'accountNumber'})
  accountSrc: Account;

  @OneToOne(() => AffiliatedBank)
  @JoinColumn({ name: 'bank_des_id', referencedColumnName: 'id'})
  bankDes : AffiliatedBank;
}
