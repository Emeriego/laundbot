import { Router } from 'express';
import { ShopController } from '../controllers/shop.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const shopRoute = Router();
shopRoute.use(authenticate);

shopRoute.post('/shops/create', ShopController.createShop);
shopRoute.get('/shops', shopOwnershipMiddleware, ShopController.getAllShops);
shopRoute.get('/shops/user/:id', shopOwnershipMiddleware, ShopController.getShopByUserId);
shopRoute.get('/shops/:id', shopOwnershipMiddleware, ShopController.getShopById);
shopRoute.put('/shops/:id', shopOwnershipMiddleware, ShopController.updateShop);
shopRoute.delete('/shops/:id', shopOwnershipMiddleware, ShopController.deleteShop);

export default shopRoute;
