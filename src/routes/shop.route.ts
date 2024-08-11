import { Router } from 'express';
import { ShopController } from '../controllers/shop.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const shopRoute = Router();

shopRoute.post('/shops/create', shopOwnershipMiddleware, ShopController.createShop);
shopRoute.get('/shops', shopOwnershipMiddleware, ShopController.getAllShops);
shopRoute.get('/shops/user/:id', shopOwnershipMiddleware, ShopController.getShopByUserId);
shopRoute.get('/shops/:id', shopOwnershipMiddleware, ShopController.getShopById);
shopRoute.put('/shops/:id', shopOwnershipMiddleware, ShopController.updateShop);
shopRoute.delete('/shops/:id', shopOwnershipMiddleware, ShopController.deleteShop);

export default shopRoute;
