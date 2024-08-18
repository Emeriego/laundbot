import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const orderRoutes = Router();

// Apply middleware globally to all routes in this router
orderRoutes.use(authenticate);
orderRoutes.use(shopOwnershipMiddleware);

orderRoutes.post('/orders/create', OrderController.createOrder);
orderRoutes.get('/orders', OrderController.getAllOrders);
orderRoutes.get('/orders/:id', OrderController.getOrderById);
orderRoutes.put('/orders/:id', OrderController.updateOrder);
orderRoutes.delete('/orders/:id', OrderController.deleteOrder);

export default orderRoutes;
