import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, OrderController.createOrder);
router.get('/', authenticate, OrderController.getAllOrders);
router.get('/:id', authenticate, OrderController.getOrderById);
router.put('/:id', authenticate, OrderController.updateOrder);
router.delete('/:id', authenticate, OrderController.deleteOrder);

export default router;
