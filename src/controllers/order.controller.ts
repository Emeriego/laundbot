import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { orderItems, ...orderData } = req.body;
      const order = await OrderService.createOrder(orderData, orderItems);
      res.status(201).json({ message: 'Order created successfully.', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Unable to create order at the moment.' });
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({ message: 'Orders retrieved successfully.', orders });
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Unable to retrieve orders at the moment.' });
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      res.status(200).json({ message: 'Order retrieved successfully.', order });
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({ message: 'Unable to retrieve order at the moment.' });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { orderItems, ...orderData } = req.body;
      const updatedOrder = await OrderService.updateOrder(id, orderData, orderItems);
      res.status(200).json({ message: 'Order updated successfully.', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Unable to update order at the moment.' });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await OrderService.deleteOrder(id);
      res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Unable to delete order at the moment.' });
    }
  }
}
