import AppDataSource  from '../data-source';
import { Shop } from '../models/shop.model';
import { User } from '../models/user.model';

export class ShopService {
  static async createShop(shopData: Partial<Shop>, userId: string) {
    try {
      const shopRepository = AppDataSource.getRepository(Shop);
      const userRepository = AppDataSource.getRepository(User);

      // Ensure the user exists
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      const shop = shopRepository.create({ ...shopData, user });
      return await shopRepository.save(shop);
    } catch (error) {
      console.error('Error creating shop:', error);
      throw new Error('Unable to create shop at the moment.');
    }
  }

  static async getAllShops() {
    try {
      const shopRepository = AppDataSource.getRepository(Shop);
      return await shopRepository.find();
    } catch (error) {
      console.error('Error fetching shops:', error);
      throw new Error('Unable to fetch shops at the moment.');
    }
  }

  static async getShopById(id: string) {
    try {
      const shopRepository = AppDataSource.getRepository(Shop);
      const shop = await shopRepository.findOne({
        where: { id },
      });

      if (!shop) {
        throw new Error('Shop not found.');
      }

      return shop;
    } catch (error) {
      console.error('Error fetching shop:', error);
      throw new Error('Unable to fetch shop at the moment.');
    }
  }

  static async updateShop(id: string, shopData: Partial<Shop>) {
    try {
      const shopRepository = AppDataSource.getRepository(Shop);
      let shop = await shopRepository.findOne({
        where: { id },
      });

      if (!shop) {
        throw new Error('Shop not found.');
      }

      shop = { ...shop, ...shopData };
      return await shopRepository.save(shop);
    } catch (error) {
      console.error('Error updating shop:', error);
      throw new Error('Unable to update shop at the moment.');
    }
  }

  static async deleteShop(id: string) {
    try {
      const shopRepository = AppDataSource.getRepository(Shop);
      const result = await shopRepository.delete({ id });

      if (result.affected === 0) {
        throw new Error('Shop not found or not authorized to delete.');
      }

      return { message: 'Shop deleted successfully.' };
    } catch (error) {
      console.error('Error deleting shop:', error);
      throw new Error('Unable to delete shop at the moment.');
    }
  }
}
