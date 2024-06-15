import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: 'varchar', nullable: false })
    surname!: string;

    @Column({ type: 'varchar', nullable: false })
    mail!: string;

    @Column({ type: 'varchar', nullable: false })
    password!: string;

    @Column({ type: 'varchar', nullable: false })
    role!: string;

    @Column({ type: 'varchar', nullable: false })
    phone!: string;

    @Column({ type: 'varchar', nullable: false })
    street!: string;

    @Column({ type: 'varchar', nullable: false })
    city!: string;

    @Column({ type: 'integer', nullable: false })
    postal_code!: number;

    @Column({ type: 'varchar', nullable: false })
    status!: string;

    @Column({ type: 'varchar', nullable: false })
    code_referral!: string;

    @Column({ type: 'integer', nullable: true })
    id_sponsor?: number;
}
