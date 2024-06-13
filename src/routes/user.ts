
import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';

const clientRouter = Router();



clientRouter.get('/getClients', async (req: any, res: any) => {

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();
    

    res.status(200).json(users);
});

clientRouter.delete('/deleteClient/:id', async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);
    const userId = req.params.id;

    try {
        const user = await userRepository.findOneBy({ id_user: parseInt(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userRepository.remove(user);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default clientRouter;