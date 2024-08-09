import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

export class ItemController {
  static async createItem(req: Request, res: Response) {
    try {
      const itemData = req.body;
      const item = await ItemService.createItem(itemData);
      res.status(201).json({ message: 'Item created successfully.', item });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemService.getAllItems();
      res.status(200).json({ message: 'Items retrieved successfully.', items });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await ItemService.getItemById(id);
      res.status(200).json({ message: 'Item retrieved successfully.', item });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const itemData = req.body;
      const updatedItem = await ItemService.updateItem(id, itemData);
      res.status(200).json({ message: 'Item updated successfully.', item: updatedItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ItemService.deleteItem(id);
      res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
