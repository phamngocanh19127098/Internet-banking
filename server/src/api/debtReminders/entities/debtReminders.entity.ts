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
    status: number;

    @Column({ name: 'created_at', type: "timestamp" })
    createdAt: Date;

    @Column({ name: 'updated_at', type: "timestamp"})
    updatedAt: Date;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column({ name: 'payment_id' })
    paymentId: number;

    @Column({ name: 'user_id' })
    userId: number;
    //payment_id
    //user_id
}
