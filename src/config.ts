import { DataSource } from 'typeorm';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "password",
    database: "ceseat",
    entities: [User],
    synchronize: true,
    logging: false,
});
