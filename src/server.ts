import express from 'express';
import { AppDataSource } from './config';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth';
import orderRouter from './routes/order';
import clientRouter from './routes/user';
import logRouter from './routes/log'
import notifRouter from './routes/notif'
import menuRouter from './routes/menu';
import articleRouter from './routes/article';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

let port: number = parseInt(process.env.PORT || '5000', 10);

function createServer() {
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

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

AppDataSource.initialize().then(() => {
    app.use('/auth', authRouter);
    app.use('/order', orderRouter);
    app.use('/client', clientRouter);
    app.use('/log', logRouter);
    app.use('/events', notifRouter);
    app.use('/menu', menuRouter);
    app.use('/article', articleRouter);

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Erreur côté serveur');
    });

    app.use((req: express.Request, res: express.Response) => {
        res.status(404).send('Impossible de trouver');
    });

    createServer();
}).catch(error => console.log(error));
