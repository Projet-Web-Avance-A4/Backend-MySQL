
import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';

const clientRouter = Router();

clientRouter.post('/getClient', async (req: any, res: any) => {

    try {
        const {userId} = req.body; // Récupère l'ID utilisateur depuis la requête
        if (userId) {
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({ where: { id_user: parseInt(userId) } });

            if (existingUser) {
                res.status(200).json(existingUser); // Retourne les informations de l'utilisateur trouvé
            } else {
                res.status(404).json({ message: 'Utilisateur non trouvé' }); // Si aucun utilisateur correspondant n'est trouvé
            }
        } else {
            res.status(400).json({ message: 'ID utilisateur non fourni dans la requête' }); // Si l'ID utilisateur n'est pas fourni dans la requête
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des informations de l\'utilisateur' });
    }
});

clientRouter.get('/getClients', async (req: any, res: any) => {

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();
    

    res.status(200).json(users);
});


clientRouter.post('/deleteClient', async (req: any, res: any) => {


    const {itemId} = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id_user: parseInt(itemId) });
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.status = "Deleted";

    await userRepository.save(user);

    res.status(200).json('Le compte a bien été supprimé');
});

export default clientRouter;