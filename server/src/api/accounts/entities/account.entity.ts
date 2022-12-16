import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entity/user.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status:number;

    @Column({name: 'account_type'})
    accountType: number;

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: number;

    @Column({name: 'updated_at', type: 'timestamp'})
    updatedAt: number;

    @Column({name: 'current_balance'})
    currentBalance: number;

    @Column({name: 'created_by'})
    createdBy: number;

    @Column({name: 'customer_id'})
    customerId: number;

    @Column({name: "account_number"})
    accountNumber: string;

    @OneToOne(()=>User)
    @JoinColumn({ name : "customer_id", referencedColumnName : "id"})
    user: User;
}
