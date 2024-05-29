import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.options('/register', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST'); // Autorise uniquement les méthodes POST
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autorise les en-têtes Content-Type et Authorization
    res.status(200).end();
});

authRouter.post('/register', async (req: any, res: any) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
});

export default authRouter;
