import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {User} from "../../users/entity/user.entity";

export enum TransactionType {
  RECHARGE = 'recharge',
  TRANSFER = 'transfer',
  DEBT_REMINDERS_PAYMENT = 'reminder',
}

@Entity({})
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_des_number' })
  accountDesNumber: number;

  @Column({ name: 'account_src_number' })
  accountSrcNumber: number;

  @Column()
  amount: number;

  @Column({ name: 'bank_des_id' })
  bankDesId: number;

  @Column()
  description: string;

  @Column({ name: 'employee_id' })
  employeeId: Date;

  @Column({ name: 'transaction_type' })
  transactionType: string;

  @Column()
  status: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
