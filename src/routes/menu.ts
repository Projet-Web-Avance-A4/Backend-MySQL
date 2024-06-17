
import { Router } from 'express';
import { AppDataSource } from '../config';
import { Menu } from '../entities/menu';

const menuRouter = Router();


menuRouter.get('/getMenus', async (req: any, res: any) => {

    const menuRepository = AppDataSource.getRepository(Menu);

    const menus = await menuRepository.find();
    

    res.status(200).json(menus);
});

export default menuRouter;