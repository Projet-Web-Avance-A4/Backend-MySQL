import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import { Router, Request, Response, NextFunction } from 'express';

const notifRouter = Router();
const app = express();
app.use(cors());

// Configurer la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ceseat'
});

// Connecter à la base de données MySQL
db.connect((err: any) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route pour gérer les connexions SSE
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Intervalle pour vérifier les nouvelles notifications
    const intervalId = setInterval(() => {
        db.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 1', (err: any, result: any) => {
            if (err) {
                console.error(err);
                return;
            }
            if (result.length > 0) {
                const notification = result[0];
                res.write(`data: ${JSON.stringify({ message: notification.message })}\n\n`);

                // Supprimer la notification après l'avoir envoyée
                db.query('DELETE FROM notifications WHERE id = ?', [notification.id], (err: any, result: any) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    }, 10000); // Vérifier les notifications toutes les 5 secondes

    // Gérer la déconnexion du client
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

const PORT = 5030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default notifRouter;
