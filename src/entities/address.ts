import { Entity, Column } from 'typeorm';

@Entity()
export class Address {
    @Column()
    street!: string;

    @Column()
    city!: string;

    @Column()
    postal_code!: string;

    @Column()
    country!: string;
}
