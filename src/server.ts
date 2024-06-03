import express from 'express';
import { AppDataSource } from './config';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});

let port: number = parseInt(process.env.PORT || '3000', 10);

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
    app.use('/api', authRouter);
    createServer();
}).catch(error => console.log(error));
