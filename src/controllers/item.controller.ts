import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

/**
 * @swagger
 * tags:
 *   name: Item
 *   description: Operations related to items
 */

/**
 * @swagger
 * /items:
 *   post:
 *     tags: [Item]
 *     summary: Create multiple items for a shop
 *     requestBody:
 *       description: Array of items to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Item Name"
 *             required:
 *               - items
 *     responses:
 *       '201':
 *         description: Items created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1 item(s) created successfully."
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Invalid request data or shop not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No items data provided." or "Shop not found in request."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create items. Please try again later."
 */

/**
 * @swagger
 * /items:
 *   get:
 *     tags: [Item]
 *     summary: Get all items for a shop
 *     responses:
 *       '200':
 *         description: Items retrieved successfully or no items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Items retrieved successfully."
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Shop not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Shop not found in request."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve items. Please try again later."
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags: [Item]
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the item
 *     responses:
 *       '200':
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item retrieved successfully."
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       '404':
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve item. Please try again later."
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     tags: [Item]
 *     summary: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the item
 *     requestBody:
 *       description: Updated item details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Item Name"
 *     responses:
 *       '200':
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item updated successfully."
 *                 updatedItem:
 *                   $ref: '#/components/schemas/Item'
 *       '404':
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update item. Please try again later."
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     tags: [Item]
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the item
 *     responses:
 *       '200':
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted successfully."
 *       '404':
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete item. Please try again later."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 */

export class ItemController {
  static async createItems(req: Request, res: Response) {
    try {
      const itemsData = req.body.items; // Assuming the items are sent in an array under `items` key
      const shopId = req.shop?.id;
  
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }
  
      if (!Array.isArray(itemsData) || itemsData.length === 0) {
        return res.status(400).json({ message: 'No items data provided.' });
      }
  
      const createdItems = [];
  
      for (const itemData of itemsData) {
        const item = await ItemService.createItem(shopId, itemData);
        createdItems.push(item);
      }
  
      res.status(201).json({
        message: `${createdItems.length} item(s) created successfully.`,
        items: createdItems,
      });
    } catch (error) {
      console.error('Error creating items:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  static async getAllItems(req: Request, res: Response) {
    try {
      const shopId = req.shop?.id;
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }

      const items = await ItemService.getAllItems(shopId);
      res.status(200).json({ message: 'Items retrieved successfully.', items });
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const shopId = req.shop?.id;
      const itemId = req.params.id;
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }

      const item = await ItemService.getItemById(shopId, itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found.' });
      }

      res.status(200).json({ message: 'Item retrieved successfully.', item });
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const shopId = req.shop?.id;
      const itemId = req.params.id;
      const itemData = req.body;
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }

      const updatedItem = await ItemService.updateItem(shopId, itemId, itemData);
      res.status(200).json({ message: 'Item updated successfully.', updatedItem });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const shopId = req.shop?.id;
      const itemId = req.params.id;
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }

      await ItemService.deleteItem(shopId, itemId);
      res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ message: error.message });
    }
  }
}
