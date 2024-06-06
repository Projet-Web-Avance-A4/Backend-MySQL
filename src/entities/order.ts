import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user';
import { Restaurant } from './restaurant';
import { Item } from './item';
import { Payment } from './payment';
import { Driver } from './driver';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id!: number;

    @Column(type => User)
    customer!: User;

    @Column(type => Restaurant)
    restaurant!: Restaurant;

    @OneToMany(type => Item, item => item.order, { cascade: true })
    items!: Item[];

    @Column({ nullable: false })
    order_status!: string;

    @Column({ nullable: false })
    verification_code!: string;

    @Column({ type: 'timestamp', nullable: false })
    estimated_delivery_time!: Date;

    @Column(type => Payment)
    payment!: Payment;

    @Column(type => Driver)
    driver!: Driver;

    @Column({ type: 'float', nullable: false })
    price!: number;
}
