//@ts-nocheck
import { CustomerService } from '../services/customer.service';
import { CustomerController } from '../controllers/customer.controller';
import { Request, Response } from 'express';

jest.mock('../services/customer.service');

describe('CustomerController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    res = { status: jest.fn().mockReturnThis(), json: jsonMock };
  });

  it('should get all customers successfully', async () => {
    (CustomerService.getAllCustomers as jest.Mock).mockResolvedValue([{ id: '1', name: 'John Doe' }]);

    req.shop = { id: 'shop1' };
    await CustomerController.getAllCustomers(req as Request, res as Response);

    expect(CustomerService.getAllCustomers).toHaveBeenCalledWith('shop1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Customers retrieved successfully',
      data: [{ id: '1', name: 'John Doe' }],
    });
  });

  it('should return error on getting all customers', async () => {
    (CustomerService.getAllCustomers as jest.Mock).mockRejectedValue(new Error('Unable to retrieve customers'));

    req.shop = { id: 'shop1' };
    await CustomerController.getAllCustomers(req as Request, res as Response);

    expect(CustomerService.getAllCustomers).toHaveBeenCalledWith('shop1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Failed to retrieve customers. Please try again later.',
    });
  });

  it('should get a customer by ID successfully', async () => {
    (CustomerService.getCustomerById as jest.Mock).mockResolvedValue({ id: '1', name: 'John Doe' });

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await CustomerController.getCustomerById(req as Request, res as Response);

    expect(CustomerService.getCustomerById).toHaveBeenCalledWith('1', 'shop1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Customer retrieved successfully',
      data: { id: '1', name: 'John Doe' },
    });
  });

  it('should return error on getting customer by ID', async () => {
    (CustomerService.getCustomerById as jest.Mock).mockRejectedValue(new Error('Unable to retrieve customer'));

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await CustomerController.getCustomerById(req as Request, res as Response);

    expect(CustomerService.getCustomerById).toHaveBeenCalledWith('1', 'shop1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Failed to retrieve customer. Please try again later.',
    });
  });

  it('should create a customer successfully', async () => {
    // Mock the CustomerService.createCustomer function
    (CustomerService.createCustomer as jest.Mock).mockResolvedValue({ id: '1', name: 'John Doe' });

    req.body = { name: 'John Doe' };
    req.shop = { id: 'shop1' };
    await CustomerController.createCustomer(req as Request, res as Response);

    expect(CustomerService.createCustomer).toHaveBeenCalledWith({ name: 'John Doe' }, 'shop1');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Customer created successfully',
      data: { id: '1', name: 'John Doe' },
    });
  });

  it('should return error on creating customer', async () => {
    // Mock the CustomerService.createCustomer function to throw an error
    (CustomerService.createCustomer as jest.Mock).mockRejectedValue(new Error('Unable to create customer'));

    req.body = { name: 'John Doe' };
    req.shop = { id: 'shop1' };
    await CustomerController.createCustomer(req as Request, res as Response);

    expect(CustomerService.createCustomer).toHaveBeenCalledWith({ name: 'John Doe' }, 'shop1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Failed to create customer. Please try again later.',
    });
  });

  it('should update a customer successfully', async () => {
    // Mock the CustomerService.updateCustomer function
    (CustomerService.updateCustomer as jest.Mock).mockResolvedValue({ id: '1', name: 'John Doe Updated' });

    req.params = { id: '1' };
    req.body = { name: 'John Doe Updated' };
    req.shop = { id: 'shop1' };
    await CustomerController.updateCustomer(req as Request, res as Response);

    expect(CustomerService.updateCustomer).toHaveBeenCalledWith('1', { name: 'John Doe Updated' }, 'shop1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Customer updated successfully',
      data: { id: '1', name: 'John Doe Updated' },
    });
  });

  it('should return error on updating customer', async () => {
    // Mock the CustomerService.updateCustomer function to throw an error
    (CustomerService.updateCustomer as jest.Mock).mockRejectedValue(new Error('Unable to update customer'));

    req.params = { id: '1' };
    req.body = { name: 'John Doe Updated' };
    req.shop = { id: 'shop1' };
    await CustomerController.updateCustomer(req as Request, res as Response);

    expect(CustomerService.updateCustomer).toHaveBeenCalledWith('1', { name: 'John Doe Updated' }, 'shop1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Failed to update customer. Please try again later.',
    });
  });

  it('should delete a customer successfully', async () => {
    // Mock the CustomerService.deleteCustomer function
    (CustomerService.deleteCustomer as jest.Mock).mockResolvedValue(true);

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await CustomerController.deleteCustomer(req as Request, res as Response);

    expect(CustomerService.deleteCustomer).toHaveBeenCalledWith('1', 'shop1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Customer deleted successfully',
    });
  });

  it('should return error on deleting customer', async () => {
    // Mock the CustomerService.deleteCustomer function to throw an error
    (CustomerService.deleteCustomer as jest.Mock).mockRejectedValue(new Error('Unable to delete customer'));

    req.params = { id: '1' };
    req.shop = { id: 'shop1' };
    await CustomerController.deleteCustomer(req as Request, res as Response);

    expect(CustomerService.deleteCustomer).toHaveBeenCalledWith('1', 'shop1');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Failed to delete customer. Please try again later.',
    });
  });
});
