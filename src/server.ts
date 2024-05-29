import express from 'express';
import { AppDataSource } from './config';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth';

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les données des requêtes
app.use(express.json());

// Middleware pour gérer les requêtes cross-origin
app.use(cors({
    origin: 'http://localhost:3000', // Autoriser les requêtes provenant de cette origine
    methods: ['GET', 'POST'], // Autoriser les méthodes GET et POST
    allowedHeaders: ['Content-Type', 'Authorization'] // Autoriser les en-têtes Content-Type et Authorization
}));

// Routes API par défaut
app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});

let port: number = parseInt(process.env.PORT || '3000', 10);

// Fonction pour créer le serveur
function createServer() {
    const server = http.createServer(app);

    // Écouter sur le port actuel
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    // Gérer les erreurs
    server.on('error', (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        if (error.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use. Trying next port...`);
            port++;
            createServer();
        } else {
            throw error;
        }
    });
}

// Initialiser la connexion à la base de données et démarrer le serveur
AppDataSource.initialize().then(() => {
    app.use('/api', authRouter);
    createServer();
}).catch(error => console.log(error));
