import { Router } from 'express';
import { AppDataSource } from '../config';
import { Menu } from '../entities/menu';
import { Article } from '../entities/article';

const productRouter = Router();

productRouter.get('/menu', async (req: any, res: any) => {
    try {
        const menuRepository = AppDataSource.getRepository(Menu);
        const menuList = await menuRepository.find();
        res.json(menuList);
    } catch (e) {
        console.error('Error fetching menus:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

productRouter.get('/article', async (req: any, res: any) => {
    try {
        const articleRepository = AppDataSource.getRepository(Article);
        const articleList = await articleRepository.find();
        res.json(articleList);
    } catch (e) {
        console.error('Error fetching articles:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default productRouter;