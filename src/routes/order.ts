
import { Router } from 'express';
import { AppDataSource } from '../config';
import { Order } from '../entities/order';
import { Not, FindOptionsWhere } from 'typeorm';

const orderRouter = Router();


orderRouter.get('/getOrders', async (req: any, res: any) => {

    const { MongoClient } = require('mongodb');

    const uri = "mongodb+srv://admin:adminces'eat@ceseat.rkfov9n.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("CES'EAT");
        const commandesCollection = database.collection("Commandes");

        const orders = commandesCollection.find({  where: {
            order_status: Not('delivered')
          } }).toArray();
        res.json(orders);

    } catch (e) {
        console.error('Error fetching commandes:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
})

export default orderRouter;