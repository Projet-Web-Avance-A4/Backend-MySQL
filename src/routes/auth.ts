import { Router } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.options('/register', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
});

authRouter.post('/register', async (req: any, res: any) => {
    const { name, surname, mail, password, role, phone, street, city, postalCode, status, code_referral, id_sponsor } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { mail } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.surname = surname;
    user.mail = mail;
    user.password = hashedPassword;
    user.role = role;
    user.phone = phone;
    user.street = street;
    user.city = city;
    user.postal_code = postalCode;
    user.status = status;
    user.code_referral = code_referral;
    user.id_sponsor = id_sponsor || null;

    await userRepository.save(user);

    const token = jwt.sign({ userId: user.id_user }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
});

authRouter.post('/login', async (req: any, res: any) => {
    const { mail, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { mail: mail } });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: existingUser.id_user }, 'votre_secret_jwt', { expiresIn: '1h' });

    res.status(200).json({ token });
});


export default authRouter;
