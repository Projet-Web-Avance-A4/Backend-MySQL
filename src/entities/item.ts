import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    menu_id?: number;

    @Column({ nullable: true })
    drink_id?: number;

    @Column({ nullable: true })
    dessert_id?: number;

    @Column()
    name!: string;

    @Column({ type: 'float' })
    price!: number;

    @ManyToOne(type => Order, order => order.items)
    order!: Order;
}
