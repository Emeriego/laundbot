// @ts-ignore
import { Customer } from '../models/customer.model';
import AppDataSource from '../data-source';
import { Shop } from '../models/shop.model'; // Import your Shop model


export class CustomerService {
  static async getAllCustomers(shopId: string) {
    try {
      const customerRepository = AppDataSource.getRepository(Customer);
      return await customerRepository.find({
        where: { shops: { id: shopId } },
        relations: ['shops'],
      });
    } catch (error) {
      console.error('Error retrieving customers:', error);
      throw new Error('Unable to retrieve customers at the moment.');
    }
  }

  static async getCustomerById(customerId: string, shopId: string) {
    try {
      const customerRepository = AppDataSource.getRepository(Customer);
      return await customerRepository.findOne({
        where: { id: customerId, shops: { id: shopId } },
        relations: ['shops'],
      });
    } catch (error) {
      console.error('Error retrieving customer:', error);
      throw new Error('Unable to retrieve customer at the moment.');
    }
  }


  static async createCustomer(customerData: Partial<Customer>, shopId: string) {
    try {
      const customerRepository = AppDataSource.getRepository(Customer);
      const customer = customerRepository.create(customerData);
  
      // Fetch the full Shop entity if necessary
      const shopRepository = AppDataSource.getRepository(Shop);
      const shop = await shopRepository.findOne({ where: { id: shopId } });
  
      if (!shop) {
        throw new Error('Shop not found');
      }
  
      customer.shops = [shop]; // Assign the full Shop object, not just the ID
  
      return await customerRepository.save(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Unable to create customer at the moment.');
    }
  }
  

  static async updateCustomer(customerId: string, customerData: Partial<Customer>, shopId: string) {
    try {
      const customerRepository = AppDataSource.getRepository(Customer);
      const customer = await customerRepository.findOne({
        where: { id: customerId, shops: { id: shopId } },
      });
      if (!customer) return null;
      customerRepository.merge(customer, customerData);
      return await customerRepository.save(customer);
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Unable to update customer at the moment.');
    }
  }

  static async deleteCustomer(customerId: string, shopId: string) {
    try {
      const customerRepository = AppDataSource.getRepository(Customer);
      const customer = await customerRepository.findOne({
        where: { id: customerId, shops: { id: shopId } },
      });
      if (!customer) return false;
      await customerRepository.remove(customer);
      return true;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new Error('Unable to delete customer at the moment.');
    }
  }
}
