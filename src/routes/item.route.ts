import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const router = Router();

router.post('/', shopOwnershipMiddleware, ItemController.createItem);
router.get('/', shopOwnershipMiddleware, ItemController.getAllItems);
router.get('/:id', shopOwnershipMiddleware, ItemController.getItemById);
router.put('/:id', shopOwnershipMiddleware, ItemController.updateItem);
router.delete('/:id', shopOwnershipMiddleware, ItemController.deleteItem);

export default router;
