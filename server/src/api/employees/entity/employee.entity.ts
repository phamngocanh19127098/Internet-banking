import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({ name: 'passphase' })
  password: string;

  @Column({ name: 'refesh_token' })
  refreshToken: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
