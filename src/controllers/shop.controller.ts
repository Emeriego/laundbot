import { Request, Response } from 'express';
import { ShopService } from '../services/shop.service';

export class ShopController {
  static async createShop(req: Request, res: Response) {
    try {
      const shopData = req.body;
      const userId = req.user.id;  // assuming req.user contains the authenticated user
      const shop = await ShopService.createShop(shopData, userId);
      res.status(201).json({ message: 'Shop created successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllShops(req: Request, res: Response) {
    try {
      const shops = await ShopService.getAllShops();
      res.status(200).json({ message: 'Shops retrieved successfully.', shops });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShopById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shop = await ShopService.getShopById(id);
      res.status(200).json({ message: 'Shop retrieved successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shopData = req.body;
      const updatedShop = await ShopService.updateShop(id, shopData);
      res.status(200).json({ message: 'Shop updated successfully.', shop: updatedShop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ShopService.deleteShop(id);
      res.status(200).json({ message: 'Shop deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
