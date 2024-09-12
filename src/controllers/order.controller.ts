import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Order]
 *     summary: Create a new order for a shop
 *     requestBody:
 *       description: Order and order items to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   tag:
 *                     type: string
 *                   status:
 *                     type: string
 *                   deliveryDate:
 *                     type: string
 *                     format: date-time
 *                   totalAmount:
 *                     type: number
 *             required:
 *               - order
 *               - orderItems
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create order. Please try again later."
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders for a shop
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve orders. Please try again later."
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve order. Please try again later."
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the order
 *     requestBody:
 *       description: Updated order and order items details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   tag:
 *                     type: string
 *                   status:
 *                     type: string
 *                   deliveryDate:
 *                     type: string
 *                     format: date-time
 *                   totalAmount:
 *                     type: number
 *             required:
 *               - order
 *               - orderItems
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update order. Please try again later."
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     tags: [Order]
 *     summary: Update the status of an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the order
 *     requestBody:
 *       description: Status to update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Delivered"
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order status updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update order status. Please try again later."
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *       '404':
 *         description: Order not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete order. Please try again later."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         tag:
 *           type: string
 *         status:
 *           type: string
 *         deliveryDate:
 *           type: string
 *           format: date-time
 *         totalAmount:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - tag
 *         - status
 *         - deliveryDate
 *         - totalAmount
 */


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
