import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Operations related to customers
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     tags: [Customer]
 *     summary: Get all customers for a shop
 *     responses:
 *       '200':
 *         description: Customers retrieved successfully or no customers found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customers retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve customers. Please try again later.
 */


/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     tags: [Customer]
 *     summary: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the customer
 *     responses:
 *       '200':
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       '404':
 *         description: Customer not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer with ID {id} not found or does not belong to this shop.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve customer. Please try again later.
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     tags: [Customer]
 *     summary: Create a new customer
 *     requestBody:
 *       description: Customer details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 789 Another Street
 *               phone:
 *                 type: string
 *                 example: 555-6789
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *     responses:
 *       '201':
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create customer. Please try again later.
 */

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     tags: [Customer]
 *     summary: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the customer
 *     requestBody:
 *       description: Updated customer details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Jane
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 123 Updated Address
 *               phone:
 *                 type: string
 *                 example: 555-9876
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.doe@example.com
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       '404':
 *         description: Customer not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer with ID {id} not found or does not belong to this shop.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update customer. Please try again later.
 */

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     tags: [Customer]
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the customer
 *     responses:
 *       '200':
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer deleted successfully
 *       '404':
 *         description: Customer not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customer with ID {id} not found or does not belong to this shop.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete customer. Please try again later.
 */

export class CustomerController {
  static async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await CustomerService.getAllCustomers(req.shop.id);
      if (customers.length === 0) {
        return res.status(200).json({
          message: 'No customers found for this shop',
          data: customers,
        });
      }
      res.status(200).json({
        message: 'Customers retrieved successfully',
        data: customers,
      });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({
        message: 'Failed to retrieve customers. Please try again later.',
      });
    }
  }

  static async getCustomerById(req: Request, res: Response) {
    try {
      const customer = await CustomerService.getCustomerById(req.params.id, req.shop.id);
      if (!customer) {
        return res.status(404).json({
          message: `Customer with ID ${req.params.id} not found or does not belong to this shop.`,
        });
      }
      res.status(200).json({
        message: 'Customer retrieved successfully',
        data: customer,
      });
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({
        message: 'Failed to retrieve customer. Please try again later.',
      });
    }
  }

  static async createCustomer(req: Request, res: Response) {
    try {
      const customer = await CustomerService.createCustomer(req.body, req.shop.id);
      res.status(201).json({
        message: 'Customer created successfully',
        data: customer,
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({
        message: 'Failed to create customer. Please try again later.',
      });
    }
  }

  static async updateCustomer(req: Request, res: Response) {
    try {
      const customer = await CustomerService.updateCustomer(req.params.id, req.body, req.shop.id);
      if (!customer) {
        return res.status(404).json({
          message: `Customer with ID ${req.params.id} not found or does not belong to this shop.`,
        });
      }
      res.status(200).json({
        message: 'Customer updated successfully',
        data: customer,
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({
        message: 'Failed to update customer. Please try again later.',
      });
    }
  }

  static async deleteCustomer(req: Request, res: Response) {
    try {
      const deleted = await CustomerService.deleteCustomer(req.params.id, req.shop.id);
      if (!deleted) {
        return res.status(404).json({
          message: `Customer with ID ${req.params.id} not found or does not belong to this shop.`,
        });
      }
      res.status(200).json({
        message: 'Customer deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({
        message: 'Failed to delete customer. Please try again later.',
      });
    }
  }
}
