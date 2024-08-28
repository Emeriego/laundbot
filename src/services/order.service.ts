import { Repository } from 'typeorm';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import AppDataSource from '../data-source';
import { generateNextOrderTag } from '../utils/tagGenerator';


export class OrderService {
  private static orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  private static orderItemRepository: Repository<OrderItem> = AppDataSource.getRepository(OrderItem);


  
  static async createOrder(shopId: string, orderData: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
    
     
      const lastOrder = await this.orderRepository
  .createQueryBuilder('order')
  .leftJoinAndSelect('order.shop', 'shop')
  .where('shop.id = :shopId', { shopId })
  .orderBy('order.createdAt', 'DESC')
  .select(['order.tag', 'order.id'])
  .getOne();

    
      const nextTag = generateNextOrderTag(lastOrder?.tag);
  
      // Extract numberOfDays from the orderData (if it exists) or use the default value of 3 days
      const numberOfDays = (orderData as any).numberOfDays || 3;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + numberOfDays);
  
      const order = this.orderRepository.create({
        ...orderData,
        shop: { id: shopId },
        tag: nextTag,
        deliveryDate,
      });
  
      const savedOrder = await this.orderRepository.save(order);
  
      if (orderItems && orderItems.length > 0) {
        const orderItemEntities = orderItems.map((item, index) => {
          const orderItem = this.orderItemRepository.create(item);
          orderItem.order = savedOrder;
  
          // Assign a tag to each item within this order (e.g., "AA01-1", "AA01-2")
          orderItem.tag = `${nextTag}-${index + 1}`;
  
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
        relations: ['orderItems', 'orderItems.item', 'orderItems.package', 'customer'],
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
        relations: ['orderItems', 'orderItems.item','orderItems.package', 'customer'],
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


  static async updateOrderStatus(shopId: string, id: string, status: string) {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id, shop: { id: shopId } },
      });
      
      if (!existingOrder) {
        throw new Error('Order not found or does not belong to this shop.');
      }
  
      existingOrder.status = status;
      await this.orderRepository.save(existingOrder);
  
      return existingOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Unable to update order status at the moment.');
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
