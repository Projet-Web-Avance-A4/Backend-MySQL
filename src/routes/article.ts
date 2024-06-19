import { Router } from 'express';
import { AppDataSource } from '../config';
import { Article } from '../entities/article';
import { MongoClient } from 'mongodb';

const articleRouter = Router();

articleRouter.get('/getArticles', async (req: any, res: any) => {

    const articleRepository = AppDataSource.getRepository(Article);

    const articles = await articleRepository.find();


    res.status(200).json(articles);
});

articleRouter.post('/createArticle', async (req: any, res: any) => {

    const { name_article, category_article, price_article, id_restorer } = req.body;

    const articleRepository = AppDataSource.getRepository(Article);

    const article = new Article();
    article.name_article = name_article;
    article.category_article = category_article;
    article.price_article = price_article;
    article.id_restorer = id_restorer


    await articleRepository.save(article);

    return res.status(200).json({ message: "Création de l'article réussie" });
});

articleRouter.post('/updateArticle', async (req: any, res: any) => {

    const { id_article, name_article, category_article, price_article, id_restorer } = req.body;

    const articleRepository = AppDataSource.getRepository(Article);
    const article = await articleRepository.findOne({ where: { id_article: id_article } });
    article!.name_article = name_article;
    article!.category_article = category_article;
    article!.price_article = price_article;
    article!.id_restorer = id_restorer

    await articleRepository.save(article!);

    return res.status(200).json({ message: "Mise à jour de l'article réussie" });
});

articleRouter.post('/deleteArticle', async (req: any, res: any) => {

    const { id_article } = req.body;

    const articleRepository = AppDataSource.getRepository(Article);
    const article = await articleRepository.findOne({ where: { id_article: id_article }});

    await articleRepository.remove(article!);

    return res.status(200).json({ message: "Suppression de l'article réussie" });
});


export default articleRouter;