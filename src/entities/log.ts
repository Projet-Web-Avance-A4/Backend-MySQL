import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: 'varchar', nullable: false })
    mail!: string;

    @Column({ type: 'varchar', nullable: false })
    role!: string;

    @Column({ type: 'varchar', nullable: false })
    type!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    timestamp!: Date;
}
