import { Router } from 'express';
import { ShopController } from '../controllers/shop.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { uploadSingleImage } from '../middlewares/fileUpload.middleware';  // Import the image upload middleware


const shopRoute = Router();
shopRoute.use(authenticate);

shopRoute.post('/shops/create', uploadSingleImage, ShopController.createShop);
// shopRoute.post('/shops/upload', ShopController.uploadShopImage);
shopRoute.get('/shops', shopOwnershipMiddleware, ShopController.getAllShops);
shopRoute.get('/shops/user/:id', shopOwnershipMiddleware, ShopController.getShopByUserId);
shopRoute.get('/shops/:id', shopOwnershipMiddleware, ShopController.getShopById);
shopRoute.put('/shops/:id', shopOwnershipMiddleware, ShopController.updateShop);
shopRoute.delete('/shops/:id', shopOwnershipMiddleware, ShopController.deleteShop);

export default shopRoute;
