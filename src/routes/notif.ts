/* import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import { Router, Request, Response, NextFunction } from 'express';

const notifRouter = Router();
const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ceseat'
});

db.connect((err: any) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const intervalId = setInterval(() => {
        db.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 1', (err: any, result: any) => {
            if (err) {
                console.error(err);
                return;
            }
            if (result.length > 0) {
                const notification = result[0];
                res.write(`data: ${JSON.stringify({ message: notification.message })}\n\n`);

                db.query('DELETE FROM notifications WHERE id = ?', [notification.id], (err: any, result: any) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }, 10000); 

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default notifRouter;
 */

import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import { MongoClient } from 'mongodb';

import { Router, Request, Response, NextFunction } from 'express';

const notifRouter = Router();
const app = express();
app.use(cors());

// Connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ceseat'
});

db.connect((err: any) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

// Connexion MongoDB
const mongoUrl = "mongodb+srv://admin:adminces'eat@ceseat.rkfov9n.mongodb.net/";
const dbName = "CES'EAT";
let mongoClient: MongoClient;
let notificationsCollection: any;

MongoClient.connect(mongoUrl)
    .then(client => {
        console.log('Connecté à la base de données MongoDB');
        mongoClient = client;
        const db = mongoClient.db(dbName);
        notificationsCollection = db.collection('Notifications');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
        process.exit(1);
    });

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const intervalId = setInterval(() => {
        db.query('SELECT * FROM Notification_buffer ORDER BY created_at DESC LIMIT 1', async (err: any, result: any) => {
            if (err) {
                console.error(err);
                return;
            }
            if (result.length > 0) {
                const notification = result[0];
                res.write(`data: ${JSON.stringify({ message: notification.message })}\n\n`);

                // Insert into MongoDB
                try {
                    await notificationsCollection.insertOne({
                        message: notification.message,
                        created_at: new Date(notification.created_at)
                    });

                    // Delete from MySQL buffer
                    db.query('DELETE FROM Notification_buffer WHERE id = ?', [notification.id], (err: any) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                } catch (mongoErr) {
                    console.error('Erreur lors de l\'insertion de la notification dans MongoDB:', mongoErr);
                }
            }
        });
    }, 10000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default notifRouter;