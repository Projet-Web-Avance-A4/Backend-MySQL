import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Menu } from './entities/menu';
import { Article } from './entities/article';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "password",
    database: "ceseat",
    entities: [User, Menu, Article],
    synchronize: true,
    logging: false,
});
