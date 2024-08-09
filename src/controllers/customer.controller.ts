import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

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
