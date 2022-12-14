import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SavedBeneficiary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'created_at', type: "timestamp" })
    createdAt: Date;

    @Column({ name: 'updated_at', type: "timestamp" })
    updatedAt: Date;

    @Column({ name: 'beneficiary_account_number' })
    beneficiaryAccountNumber: number;

    @Column({ name: 'beneficiary_default_name' })
    beneficiaryDefaultName: string;

    @Column({ name: 'beneficiary_nickname' })
    beneficiaryNickname: string;

    @Column({ name: 'beneficiary_bank_id' })
    beneficiaryBankId: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    // customer_id
    // beneficiary_bank_id
}
