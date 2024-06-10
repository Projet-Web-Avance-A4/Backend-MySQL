import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';
import { Menu } from '../entities/menu';
import { Article } from '../entities/article';

const clientRouter = Router();

clientRouter.get('/menus', async (req: any, res: any) => {
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        const menuList = await menuRepository.find();
        res.json(menuList);
    } catch (e) {
        console.error('Error fetching menus:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

clientRouter.get('/articles', async (req: any, res: any) => {
    try {
        const articleRepository = AppDataSource.getRepository(Article);
        const articleList = await articleRepository.find();
        res.json(articleList);
    } catch (e) {
        console.error('Error fetching articles:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

clientRouter.post('/commandes', async (req: any, res: any) => {
    const customer_id = req.body.customer_id;
    const { MongoClient } = require('mongodb');

    const uri = "mongodb+srv://admin:adminces'eat@ceseat.rkfov9n.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db("CES'EAT");
        const commandesCollection = database.collection("Commandes");

        const commandesListe = await commandesCollection.find({ "customer.customer_id": customer_id }).toArray(); // Utilisez toArray() pour obtenir les documents sous forme de tableau
        res.json(commandesListe);

    } catch (e) {
        console.error('Error fetching commandes:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
})

clientRouter.post('/livraison', async (req: any, res: any) => {
    const customer_id = req.body.customer_id;
    const { MongoClient } = require('mongodb');

    const uri = "mongodb+srv://admin:adminces'eat@ceseat.rkfov9n.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db("CES'EAT");
        const commandesCollection = database.collection("Commandes");

        const commandInDelivery = await commandesCollection.findOne({
            "customer.customer_id": customer_id,
            "order_status": "in_progress"
        });
        res.json(commandInDelivery);

    } catch (e) {
        console.error('Error fetching command in delivery:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
})

export default clientRouter;