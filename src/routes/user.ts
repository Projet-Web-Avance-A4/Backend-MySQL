
import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';

const clientRouter = Router();


clientRouter.get('/getClients', async (req: any, res: any) => {

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();
    

    res.status(200).json(users);
});

export default clientRouter;