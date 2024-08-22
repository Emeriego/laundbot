import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const itemRoutes = Router();
itemRoutes.use(authenticate);


itemRoutes.post('/items/create', shopOwnershipMiddleware, ItemController.createItem);
itemRoutes.get('/items', shopOwnershipMiddleware, ItemController.getAllItems);
itemRoutes.get('/items/:id', shopOwnershipMiddleware, ItemController.getItemById);
itemRoutes.put('/items/:id', shopOwnershipMiddleware, ItemController.updateItem);
itemRoutes.delete('/items/:id', shopOwnershipMiddleware, ItemController.deleteItem);

export default itemRoutes;
