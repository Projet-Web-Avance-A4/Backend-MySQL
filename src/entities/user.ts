import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column('varchar', { nullable: false })
    name!: string;

    @Column('varchar', { nullable: false })
    surname!: string;

    @Column('varchar', { nullable: false })
    mail!: string;

    @Column('varchar', { nullable: false })
    password!: string;

    @Column('varchar', { nullable: false })
    role!: string;

    @Column('varchar', { nullable: false })
    phone!: string;

    @Column('varchar', { nullable: false })
    street!: string;

    @Column('varchar', { nullable: false })
    city!: string;

    @Column('integer', { nullable: false })
    postal_code!: number;

    @Column('varchar', { nullable: false })
    status!: string;

    @Column('varchar', { nullable: false })
    code_referral!: string;

    @Column('integer', { nullable: true })
    id_sponsor?: number;
}
