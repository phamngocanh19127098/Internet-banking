import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Transaction} from "../../transactions/entities/transaction.entity";

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column()
  email: string;

  @Column({ name: 'bdate' })
  dob: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  role: Role;

  @Column()
  status: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction)=>transaction.user)
  transactions : Transaction[];
}
