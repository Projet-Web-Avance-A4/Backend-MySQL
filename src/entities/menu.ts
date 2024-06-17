import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id_menu!: number;

    @Column({ nullable: false })
    price_menu!: number;

    @Column({ nullable: false })
    name_menu!: string;

    @Column({ nullable: false })
    id_dish!: number;

    @Column({ nullable: false })
    category!: number;

    @Column({ nullable: false })
    id_restorer!: number;
}
