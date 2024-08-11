import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

export class ItemController {
  static async createItem(req: Request, res: Response) {
    try {
      const itemData = req.body;
      const shopId = req.shop?.id;
      if (!shopId) {
        return res.status(400).json({ message: 'Shop not found in request.' });
      }

      const item = await ItemService.createItem(shopId, itemData);
      res.status(201).json({ message: 'Item created successfully.', item });
    } catch (error) {
      console.error('Error creating item:', error);
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
