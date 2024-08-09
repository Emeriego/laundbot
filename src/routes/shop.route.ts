import { Router } from 'express';
import { ShopController } from '../controllers/shop.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const router = Router();

router.post('/', shopOwnershipMiddleware, ShopController.createShop);
router.get('/', shopOwnershipMiddleware, ShopController.getAllShops);
router.get('/:id', shopOwnershipMiddleware, ShopController.getShopById);
router.put('/:id', shopOwnershipMiddleware, ShopController.updateShop);
router.delete('/:id', shopOwnershipMiddleware, ShopController.deleteShop);

export default router;
