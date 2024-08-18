import { Repository } from 'typeorm';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import AppDataSource from '../data-source';

export class OrderService {
  private static orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  private static orderItemRepository: Repository<OrderItem> = AppDataSource.getRepository(OrderItem);

  static async createOrder(shopId: string, orderData: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
      const order = this.orderRepository.create({ ...orderData, shop: { id: shopId } });
      const savedOrder = await this.orderRepository.save(order);

      if (orderItems && orderItems.length > 0) {
        const orderItemEntities = orderItems.map((item) => {
          const orderItem = this.orderItemRepository.create(item);
          orderItem.order = savedOrder;
          return orderItem;
        });
        await this.orderItemRepository.save(orderItemEntities);
      }

      return savedOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Unable to create order at the moment.');
    }
  }

  static async getAllOrders(shopId: string) {
    try {
      return await this.orderRepository.find({
        where: { shop: { id: shopId } },
        relations: ['orderItems', 'orderItems.item', 'orderItems.package'],
      });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new Error('Unable to retrieve orders at the moment.');
    }
  }

  static async getOrderById(shopId: string, id: string) {
    try {
      return await this.orderRepository.findOne({
        where: { id, shop: { id: shopId } },
        relations: ['orderItems', 'orderItems.item', 'orderItems.treatments'],
      });
    } catch (error) {
      console.error('Error retrieving order:', error);
      throw new Error('Unable to retrieve order at the moment.');
    }
  }

  static async updateOrder(shopId: string, id: string, orderData: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id, shop: { id: shopId } },
      });
      if (!existingOrder) {
        throw new Error('Order not found or does not belong to this shop.');
      }

      Object.assign(existingOrder, orderData);
      await this.orderRepository.save(existingOrder);

      if (orderItems && orderItems.length > 0) {
        await this.orderItemRepository.delete({ order: { id } }); // delete old order items
        const orderItemEntities = orderItems.map((item) => {
          const orderItem = this.orderItemRepository.create(item);
          orderItem.order = existingOrder;
          return orderItem;
        });
        await this.orderItemRepository.save(orderItemEntities);
      }

      return existingOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Unable to update order at the moment.');
    }
  }

  static async deleteOrder(shopId: string, id: string) {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id, shop: { id: shopId } },
      });

      if (!existingOrder) {
        throw new Error('Order not found or does not belong to this shop.');
      }

      await this.orderRepository.delete(id);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Unable to delete order at the moment.');
    }
  }
}
