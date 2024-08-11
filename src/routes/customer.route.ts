import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const customerRoute = Router();

customerRoute.use(authenticate); // Ensure the user is authenticated for all customer routes

customerRoute.get('/customers', shopOwnershipMiddleware, CustomerController.getAllCustomers); // Get all customers for the authenticated user's shop
customerRoute.get('/customers/:id', shopOwnershipMiddleware, CustomerController.getCustomerById); // Get a specific customer by ID
customerRoute.post('/customers/create', shopOwnershipMiddleware, CustomerController.createCustomer); // Create a new customer
customerRoute.put('/customers/:id', shopOwnershipMiddleware, CustomerController.updateCustomer); // Update a specific customer
customerRoute.delete('/customers/:id', shopOwnershipMiddleware, CustomerController.deleteCustomer); // Delete a specific customer

export default customerRoute;
