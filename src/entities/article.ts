import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id_article!: number;

    @Column({ type: 'varchar', nullable: false })
    name_article!: string;

    @Column({ type: 'varchar', nullable: false })
    category_article!: string;

    @Column({ type: 'integer', nullable: false })
    price_article!: number;

    @Column({ type: 'integer', nullable: false })
    id_restorer!: number;
}