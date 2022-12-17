import { User } from "src/api/users/entity/user.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { DebtReminderEnum } from "../enum/debtReminder.enum";

@Entity('debt_reminder')
export class DebtReminder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'account_des_number' })
    accountDesNumber: number;

    @Column({ name: 'account_src_number' })
    accountSrcNumber: number;

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

    @Column({name: "payment_status"})
    paymentStatus: DebtReminderEnum

    @Column({name: 'receiver_id'})
    receiverId : number;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id'})
    receiver: User;
    //payment_id
    //user_id
}
