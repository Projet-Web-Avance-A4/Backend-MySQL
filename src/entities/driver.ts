import { Entity, Column } from 'typeorm';

@Entity()
export class Driver {
    @Column()
    driver_id!: number;

    @Column()
    name!: string;

    @Column()
    phone!: string;
}
