import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    surname!: string;

    @Column({ nullable: false })
    mail!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: false })
    role!: string;

    @Column({ nullable: false })
    phone!: string;

    @Column({ nullable: false })
    street!: string;

    @Column({ nullable: false })
    city!: string;

    @Column({ nullable: false })
    postal_code!: number;

    @Column({ nullable: false })
    status!: string;

    @Column({ nullable: false })
    code_referral!: string;

    @Column({ nullable: true })
    id_sponsor?: number;
}
