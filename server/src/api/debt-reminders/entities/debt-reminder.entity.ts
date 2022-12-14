import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DebtReminder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'account_des_number' })
    accountDesNumber: number;

    @Column({ name: 'account_src_number' })
    accountSrcNumber: number;

    @Column()
    status: string;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @Column()
    amount: number;

    @Column()
    description: string;

    //payment_id
    //user_id
}
