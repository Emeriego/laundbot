import { Repository } from 'typeorm';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
import AppDataSource from '../data-source';

export class OrderService {
  private static orderRepository: Repository<Order> = AppDataSource.getRepository(Order);
  private static orderItemRepository: Repository<OrderItem> = AppDataSource.getRepository(OrderItem);

  static async createOrder(orderData: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
      const order = this.orderRepository.create(orderData);
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

  static async getAllOrders() {
    try {
      return await this.orderRepository.find({ relations: ['orderItems', 'orderItems.item', 'orderItems.treatments'] });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new Error('Unable to retrieve orders at the moment.');
    }
  }

  static async getOrderById(id: string) {
    try {
      return await this.orderRepository.findOne({
        where: { id },
        relations: ['orderItems', 'orderItems.item', 'orderItems.treatments'],
      });
    } catch (error) {
      console.error('Error retrieving order:', error);
      throw new Error('Unable to retrieve order at the moment.');
    }
  }

  static async updateOrder(id: string, orderData: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
      const existingOrder = await this.orderRepository.findOneBy({ id });
      if (!existingOrder) {
        throw new Error('Order not found');
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

  static async deleteOrder(id: string) {
    try {
      await this.orderRepository.delete(id);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Unable to delete order at the moment.');
    }
  }
}



// import AppDataSource  from '../data-source';
// import { Order } from '../models/order.model';
// import { Customer } from '../models/customer.model';
// import { Package } from '../models/package.model';
// import { Shop } from '../models/shop.model';

// export class OrderService {
//   static async createOrder(orderData: Partial<Order>) {
//     try {
//       const orderRepository = AppDataSource.getRepository(Order);
//       const customerRepository = AppDataSource.getRepository(Customer);
//       const packageRepository = AppDataSource.getRepository(Package);
//       const shopRepository = AppDataSource.getRepository(Shop);

//       // Validate customer, package, and shop
//       const customer = await customerRepository.findOne({ where: { id: orderData.customer.id } });
//       const pkg = await packageRepository.findOne({ where: { id: orderData.package.id } });
//       const shop = await shopRepository.findOne({ where: { id: orderData.shop.id } });

//       if (!customer || !pkg || !shop) {
//         throw new Error('Invalid customer, package, or shop.');
//       }

//       const order = orderRepository.create({
//         ...orderData,
//         customer,
//         package: pkg,
//         shop,
//       });

//       return await orderRepository.save(order);
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw new Error('Unable to create order at the moment.');
//     }
//   }

//   static async getAllOrders() {
//     try {
//       const orderRepository = AppDataSource.getRepository(Order);
//       return await orderRepository.find({ relations: ['customer', 'package', 'shop', 'orderItems'] });
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       throw new Error('Unable to fetch orders at the moment.');
//     }
//   }

//   static async getOrderById(id: string) {
//     try {
//       const orderRepository = AppDataSource.getRepository(Order);
//       const order = await orderRepository.findOne({ where: { id }, relations: ['customer', 'package', 'shop', 'orderItems'] });

//       if (!order) {
//         throw new Error('Order not found.');
//       }

//       return order;
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       throw new Error('Unable to fetch order at the moment.');
//     }
//   }

//   static async updateOrder(id: string, orderData: Partial<Order>) {
//     try {
//       const orderRepository = AppDataSource.getRepository(Order);
//       let order = await orderRepository.findOne({ where: { id } });

//       if (!order) {
//         throw new Error('Order not found.');
//       }

//       // Validate customer, package, and shop if they are being updated
//       if (orderData.customer) {
//         const customerRepository = AppDataSource.getRepository(Customer);
//         const customer = await customerRepository.findOne({ where: { id: orderData.customer.id } });
//         if (!customer) {
//           throw new Error('Invalid customer.');
//         }
//         order.customer = customer;
//       }

//       if (orderData.package) {
//         const packageRepository = AppDataSource.getRepository(Package);
//         const pkg = await packageRepository.findOne({ where: { id: orderData.package.id } });
//         if (!pkg) {
//           throw new Error('Invalid package.');
//         }
//         order.package = pkg;
//       }

//       if (orderData.shop) {
//         const shopRepository = AppDataSource.getRepository(Shop);
//         const shop = await shopRepository.findOne({ where: { id: orderData.shop.id } });
//         if (!shop) {
//           throw new Error('Invalid shop.');
//         }
//         order.shop = shop;
//       }

//       order = { ...order, ...orderData };
//       return await orderRepository.save(order);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       throw new Error('Unable to update order at the moment.');
//     }
//   }

//   static async deleteOrder(id: string) {
//     try {
//       const orderRepository = AppDataSource.getRepository(Order);
//       const result = await orderRepository.delete({ id });

//       if (result.affected === 0) {
//         throw new Error('Order not found or not authorized to delete.');
//       }

//       return { message: 'Order deleted successfully.' };
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       throw new Error('Unable to delete order at the moment.');
//     }
//   }
// }
