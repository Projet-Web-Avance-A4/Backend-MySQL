import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Log } from './entities/log';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "password",
    database: "ceseat",
    entities: [User, Log],
    synchronize: true,
    logging: false,
});
