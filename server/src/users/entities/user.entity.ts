import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({})
@Unique(['username', 'email', 'accountNumber'])
export class User {
  @Column({ name: 'accountNumber' })
  accountNumber: string;

  @Column({
    name: 'username',
  })
  username: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'email',
  })
  email: string;

  @PrimaryGeneratedColumn({
    name: 'phone',
  })
  phone: string;

  @Column({
    name: 'password',
  })
  password: string;
}
