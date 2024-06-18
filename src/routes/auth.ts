import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config';
import { User } from '../entities/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = Router();

interface jwtUser {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: jwtUser;
        }
    }
}

function generateAccessToken(user: any) {
    return jwt.sign(user, 'access_secret_jwt', { expiresIn: '15min' });
}

function generateRefreshToken(user: any) {
    return jwt.sign(user, 'refresh_secret_jwt', { expiresIn: '7d' });
}

function authenticateJWT(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, 'access_secret_jwt', (err: any, user: any) => {
        if (err) {
            console.error('Erreur de vérification du token:', err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token expiré' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Token invalide' });
            } else {
                return res.status(403).json({ message: 'Erreur de vérification du token' });
            }
        }
        req.user = user;
        next();
    });
}

authRouter.post('/register', async (req: Request, res: Response) => {
    const { name, surname, mail, password, role, phone, street, city, postalCode, status, code_referral, id_sponsor } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { mail } });

    if (existingUser) {
        if (existingUser.status !== 'Deleted') {
            return res.status(400).json({ message: 'Création du compte impossible' });
        } else {
            existingUser.name = name;
            existingUser.surname = surname;
            existingUser.password = await bcrypt.hash(password, 10);
            existingUser.role = role;
            existingUser.phone = phone;
            existingUser.street = street;
            existingUser.city = city;
            existingUser.postal_code = postalCode;
            existingUser.status = 'Active';
            existingUser.code_referral = code_referral;
            existingUser.id_sponsor = id_sponsor || null;

            await userRepository.save(existingUser);

            return res.status(200).json({ message: 'Création du compte réussie' });
        }
    } else {
        const user = new User();
        user.name = name;
        user.surname = surname;
        user.mail = mail;
        user.password = await bcrypt.hash(password, 10);
        user.role = role;
        user.phone = phone;
        user.street = street;
        user.city = city;
        user.postal_code = postalCode;
        user.status = status;
        user.code_referral = code_referral;
        user.id_sponsor = id_sponsor || null;

        await userRepository.save(user);

        return res.status(200).json({ message: 'Création du compte réussie' });
    }
});

authRouter.post('/login', async (req: any, res: any) => {
    const { mail, password, appRole } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { mail } });
    if (!existingUser || existingUser.status == 'Deleted') {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (appRole !== existingUser.role) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const dataUserToken = {
        userId: existingUser.id_user,
        name: existingUser.name,
        surname: existingUser.surname,
        mail: existingUser.mail,
        role: existingUser.role,
        phone: existingUser.phone,
        street: existingUser.street,
        city: existingUser.city,
        postal_code: existingUser.postal_code,
        status: existingUser.status,
        code_referral: existingUser.code_referral,
        id_sponsor: existingUser.id_sponsor
    }

    const accessToken = generateAccessToken(dataUserToken);
    const refreshToken = generateRefreshToken(dataUserToken);

    try {
        const response = await fetch('http://localhost:4000/log/createLog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_user: existingUser.id_user,
                name: `${existingUser.name} ${existingUser.surname}`,
                mail: existingUser.mail,
                role: existingUser.role,
                type: 'Connexion',
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.error('Failed to create log:', await response.text());
        }
    } catch (error) {
        console.error('Failed to create log:', error);
    }

    res.status(200).json({ accessToken, refreshToken });
});

authRouter.post('/update', authenticateJWT, async (req: any, res: any) => {

    const { name, surname, currentMail, newMail, phone, street, city, postalCode } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { mail: currentMail } });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    existingUser.name = name;
    existingUser.surname = surname;
    existingUser.mail = newMail;
    existingUser.phone = phone;
    existingUser.street = street;
    existingUser.city = city;
    existingUser.postal_code = postalCode;

    await userRepository.save(existingUser);

    const dataUserToken = {
        userId: existingUser.id_user,
        name: existingUser.name,
        surname: existingUser.surname,
        mail: existingUser.mail,
        role: existingUser.role,
        phone: existingUser.phone,
        street: existingUser.street,
        city: existingUser.city,
        postal_code: existingUser.postal_code,
        status: existingUser.status,
        code_referral: existingUser.code_referral,
        id_sponsor: existingUser.id_sponsor
    }

    const accessToken = generateAccessToken(dataUserToken);
    const refreshToken = generateRefreshToken(dataUserToken);

    res.status(200).json({ accessToken, refreshToken, message: 'OK' });
});

authRouter.post('/update-password', async (req: any, res: any) => {
    const { mail, oldPassword, newPassword } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const existingUser = await userRepository.findOne({ where: { mail } });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }


    const passwordMatch = await bcrypt.compare(oldPassword, existingUser.password);

    if (passwordMatch) {
        existingUser.password = hashedPassword;
        await userRepository.save(existingUser);
        res.status(200).json({ message: 'Nouveau mot de passe appliqué' });
    } else {
        res.status(422).json({ message: 'Erreur de modification, veuillez réitérer' })
    }
});

authRouter.post('/delete', authenticateJWT, async (req: any, res: any) => {
    const { mail, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { mail } });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    existingUser.status = "Deleted";

    await userRepository.save(existingUser);

    res.status(200).json('Votre compte a bien été supprimé');
});

export default authRouter;
