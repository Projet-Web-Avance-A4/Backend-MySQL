import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id_menu!: number;

    @Column({ type: 'integer', nullable: false })
    price_menu!: number;

    @Column({ type: 'varchar', nullable: false })
    name_menu!: string;

    @Column({ type: 'integer', nullable: false })
    id_dish!: number;

    @Column({ type: 'integer', nullable: false })
    category!: number;

    @Column({ type: 'integer', nullable: false })
    id_restorer!: number;
}