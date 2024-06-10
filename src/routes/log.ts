import { Router } from 'express';
import { AppDataSource } from '../config';
import { Log } from '../entities/log';

const logRouter = Router();

logRouter.post('/createLog', async (req, res) => {
    const { id_user, name, mail, role, type, timestamp } = req.body;

    try {
        const logRepository = AppDataSource.getRepository(Log);

        const newLog = new Log();
        newLog.id_user = id_user;
        newLog.name = name;
        newLog.mail = mail;
        newLog.role = role;
        newLog.type = type;
        newLog.timestamp = new Date(timestamp);

        await logRepository.save(newLog);

        res.status(201).json({ message: 'Log created successfully' });
    } catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ message: 'Failed to create log' });
    }
});

logRouter.get('/getLog', async (req, res) => {
    try {
        const logRepository = AppDataSource.getRepository(Log);
        const logs = await logRepository.find();
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Failed to fetch logs' });
    }
});

export default logRouter;
