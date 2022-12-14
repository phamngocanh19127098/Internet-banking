import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
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
}
