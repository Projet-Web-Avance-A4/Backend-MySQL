// mysqlBackend.ts

import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());

// Connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ceseat'
});

db.connect((err) => {
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
        db.query('SELECT * FROM Notification_buffer ORDER BY created_at DESC LIMIT 1', async (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            if (result.length > 0) {
                const notification = result[0];
                res.write(`data: ${JSON.stringify({ message: notification.message })}\n\n`);

                // Insert into MongoDB
                try {
                    const response = await fetch('http://localhost:4040/notifications', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: notification.message,
                            created_at: notification.created_at
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Erreur lors de l'insertion de la notification dans MongoDB: ${response.statusText}`);
                    }

                    // Delete from MySQL buffer
                    db.query('DELETE FROM Notification_buffer WHERE id = ?', [notification.id], (err) => {
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
    console.log(`MySQL Server is running on port ${PORT}`);
});

export default app;
