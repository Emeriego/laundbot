import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const router = Router();

router.use(authenticate); // Ensure the user is authenticated for all customer routes

router.get('/', shopOwnershipMiddleware, CustomerController.getAllCustomers); // Get all customers for the authenticated user's shop
router.get('/:id', shopOwnershipMiddleware, CustomerController.getCustomerById); // Get a specific customer by ID
router.post('/', shopOwnershipMiddleware, CustomerController.createCustomer); // Create a new customer
router.put('/:id', shopOwnershipMiddleware, CustomerController.updateCustomer); // Update a specific customer
router.delete('/:id', shopOwnershipMiddleware, CustomerController.deleteCustomer); // Delete a specific customer

export default router;
