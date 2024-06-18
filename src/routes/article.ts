import { Router } from 'express';
import { AppDataSource } from '../config';
import { Article } from '../entities/article';

const articleRouter = Router();


articleRouter.get('/getArticles', async (req: any, res: any) => {

    const articleRepository = AppDataSource.getRepository(Article);

    const articles = await articleRepository.find();
    

    res.status(200).json(articles);
});

export default articleRouter;