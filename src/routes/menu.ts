import { Router } from 'express';
import { AppDataSource } from '../config';
import { Menu } from '../entities/menu';

const menuRouter = Router();


menuRouter.get('/getMenus', async (req: any, res: any) => {

    const menuRepository = AppDataSource.getRepository(Menu);

    const menus = await menuRepository.find();


    res.status(200).json(menus);
});

menuRouter.post('/createMenu', async (req: any, res: any) => {

    const { name_menu, category, price_menu, id_restorer, id_dish } = req.body;

    const menuRepository = AppDataSource.getRepository(Menu);

    const menu = new Menu();
    menu.name_menu = name_menu;
    menu.category = category;
    menu.price_menu = price_menu;
    menu.id_restorer = id_restorer;
    menu.id_dish = id_dish;

    await menuRepository.save(menu);

    return res.status(200).json({ message: "Création du menu réussie" });
});

menuRouter.post('/updateMenu', async (req: any, res: any) => {

    const { id_menu, name_menu, category, price_menu, id_restorer, id_dish } = req.body;

    const menuRepository = AppDataSource.getRepository(Menu);
    const menu = await menuRepository.findOne({ where: { id_menu: id_menu } });
    menu!.name_menu = name_menu;
    menu!.category = category;
    menu!.price_menu = price_menu;
    menu!.id_restorer = id_restorer
    menu!.id_dish = id_dish

    await menuRepository.save(menu!);

    return res.status(200).json({ message: "Mise à jour du menu réussie" });
});

menuRouter.post('/deleteMenu', async (req: any, res: any) => {

    const { id_menu } = req.body;

    const menuRepository = AppDataSource.getRepository(Menu);
    const menu = await menuRepository.findOne({ where: { id_menu: id_menu }});

    await menuRepository.remove(menu!);

    return res.status(200).json({ message: "Suppression du menu réussie" });
});


export default menuRouter;