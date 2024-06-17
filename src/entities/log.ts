import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    name!: string;

    @Column('varchar', { nullable: false })
    mail!: string;

    @Column('varchar', { nullable: false })
    role!: string;

    @Column('varchar', { nullable: false })
    type!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    timestamp!: Date;
}
