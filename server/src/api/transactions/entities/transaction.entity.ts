import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import {User} from "../../users/entity/user.entity";

export enum TransactionType {
  RECHARGE = 'recharge',
  TRANSFER = 'transfer',
  DEBT_REMINDERS_PAYMENT = 'reminder',
}

@Entity({name : 'transaction'})
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
  employeeId: Date; // number ???

  @Column({ name: 'transaction_type' })
  transactionType: string;

  @Column()
  status: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({name: 'user_id'})
  userId: number;

  @OneToOne(() => User, (user) => user.transactions)
  @JoinColumn({name: 'user_id', referencedColumnName : 'id'})
  user: User;
}
