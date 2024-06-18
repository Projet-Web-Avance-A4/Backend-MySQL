import { DataSource } from 'typeorm';
import { User } from './entities/user';
import { Log } from './entities/log';
import { Address } from './entities/address';
import { Item } from './entities/item';
import { Order } from './entities/order';
import { Payment } from './entities/payment';
import { Restaurant } from './entities/restaurant';

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
