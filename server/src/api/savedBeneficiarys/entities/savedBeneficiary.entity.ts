import { AffiliatedBank } from "src/api/affiliatedBanks/entities/affiliatedBank.entity";
import { User } from "src/api/users/entity/user.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('saved_beneficiary')
export class SavedBeneficiary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'created_at', type: "timestamp" })
    createdAt: Date;

    @Column({ name: 'updated_at', type: "timestamp" })
    updatedAt: Date;

    @Column({ name: 'beneficiary_account_number' })
    beneficiaryAccountNumber: string;

    @Column({ name: 'beneficiary_default_name' })
    beneficiaryDefaultName: string;

    @Column({ name: 'beneficiary_nickname' })
    beneficiaryNickname: string;

    @Column({ name: 'beneficiary_bank_id' })
    beneficiaryBankId: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @OneToOne(() => User)
    @JoinColumn({ name : "customer_id", referencedColumnName : "id"})
    user: User;

    // @ManyToOne(()=> AffiliatedBank, (affiliatedBank) => affiliatedBank.savedBeneficiary)
    // affiliatedBank: AffiliatedBank;
    
    // customer_id
    // beneficiary_bank_id
}
