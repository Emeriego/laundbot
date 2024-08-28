import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  
  static async createOrder(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orderData = req.body.order;
      const orderItems = req.body.orderItems;

      const newOrder = await OrderService.createOrder(shopId, orderData, orderItems);
      res.status(201).json({
        message: 'Order created successfully',
        data: newOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  
  static async getAllOrders(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orders = await OrderService.getAllOrders(shopId);
      res.status(200).json({
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }


  
  static async getOrderById(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orderId = req.params.id;

      const order = await OrderService.getOrderById(shopId, orderId);
      if (!order) {
        return res.status(404).json({
          message: `Order with ID ${orderId} not found or does not belong to this shop.`,
        });
      }

      res.status(200).json({
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orderId = req.params.id;
      const orderData = req.body.order;
      const orderItems = req.body.orderItems;

      const updatedOrder = await OrderService.updateOrder(shopId, orderId, orderData, orderItems);
      res.status(200).json({
        message: 'Order updated successfully',
        data: updatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }


  static async updateOrderStatus(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orderId = req.params.id;
      const { status } = req.body;
  
      const updatedOrder = await OrderService.updateOrderStatus(shopId, orderId, status);
      res.status(200).json({
        message: 'Order status updated successfully',
        data: updatedOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  
  static async deleteOrder(req: Request, res: Response) {
    try {
      const shopId = req.shop.id;
      const orderId = req.params.id;

      await OrderService.deleteOrder(shopId, orderId);
      res.status(200).json({
        message: 'Order deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
