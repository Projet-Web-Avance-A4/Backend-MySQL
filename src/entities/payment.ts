import { Entity, Column } from 'typeorm';

@Entity()
export class Payment {
    @Column()
    method!: string;

    @Column()
    transaction_id!: string;

    @Column({ type: 'float' })
    amount!: number;

    @Column()
    currency!: string;

    @Column({ type: 'timestamp' })
    time_payment!: Date;
}
