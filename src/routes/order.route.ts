import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth.middleware';

const orderRoutes = Router();

orderRoutes.post('/orders/create', authenticate, OrderController.createOrder);
orderRoutes.get('/orders', authenticate, OrderController.getAllOrders);
orderRoutes.get('/orders/:id', authenticate, OrderController.getOrderById);
orderRoutes.put('/orders/:id', authenticate, OrderController.updateOrder);
orderRoutes.delete('/orders/:id', authenticate, OrderController.deleteOrder);

export default orderRoutes;
