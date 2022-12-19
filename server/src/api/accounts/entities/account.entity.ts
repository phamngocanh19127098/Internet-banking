import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

export enum AccountStatus {
  ACTIVE = 1,
  DISABLE = 0,
}

export enum AccountType {
  PAYMENT_ACCOUNT = 1,
  SAVING_ACCOUNT = 2
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: AccountStatus;

  @Column({ name: 'account_type' })
  accountType: AccountType;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @Column({ name: 'current_balance' })
  currentBalance: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'account_number' })
  accountNumber: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  user: User;
}
