import { Entity, Column } from 'typeorm';
import { Address } from './address';

@Entity()
export class Restaurant {
    @Column()
    restaurant_id!: number;

    @Column()
    name!: string;

    @Column()
    phone!: string;

    @Column(type => Address)
    address!: Address;
}
