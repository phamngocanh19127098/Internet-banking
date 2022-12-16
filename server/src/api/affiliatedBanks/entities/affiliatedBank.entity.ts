import { SavedBeneficiary } from "src/api/savedBeneficiarys/entities/savedBeneficiary.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('affiliated_bank')
export class AffiliatedBank {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: number;

    @Column({name: 'updated_at', type: 'timestamp'})
    updatedAt: number;

    @Column({name: 'public_key'})
    publicKey: string;

    @Column({name: 'connection_type'})
    connectionType: string;

    @Column({name: 'crypto_type'})
    cryptoType: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    status: string;

    @OneToMany(()=> SavedBeneficiary, (savedBeneficiary) => savedBeneficiary.affiliatedBank)
    savedBeneficiary : SavedBeneficiary[];
}
