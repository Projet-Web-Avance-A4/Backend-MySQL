import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Log } from './entities/log';
import { Menu } from './entities/menu'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "password",
    database: "ceseat",
    entities: [User, Log, Menu],
    synchronize: true,
    logging: false,
});
