import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id_article!: number;

    @Column({ nullable: false })
    name_article!: string;

    @Column({ nullable: false })
    category_article!: string;

    @Column({ nullable: false })
    price_article!: number;

    @Column({ nullable: false })
    id_restorer!: number;
}