import AppDataSource  from '../data-source';
import { Package } from '../models/package.model';
import { Shop } from '../models/shop.model';

export class PackageService {
  static async createPackage(packageData: Partial<Package>, shopId: string) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      const shopRepository = AppDataSource.getRepository(Shop);

      const shop = await shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        throw new Error('Shop not found.');
      }

      const pkg = packageRepository.create({ ...packageData, shop });
      return await packageRepository.save(pkg);
    } catch (error) {
      console.error('Error creating package:', error);
      throw new Error('Unable to create package at the moment.');
    }
  }

  static async getAllPackages(shopId: string) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      return await packageRepository.find({
        where: { shop: { id: shopId } },
      });
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw new Error('Unable to fetch packages at the moment.');
    }
  }

  static async getPackageById(id: string, shopId: string) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      const pkg = await packageRepository.findOne({
        where: { id, shop: { id: shopId } },
      });

      if (!pkg) {
        throw new Error('Package not found.');
      }

      return pkg;
    } catch (error) {
      console.error('Error fetching package:', error);
      throw new Error('Unable to fetch package at the moment.');
    }
  }

  static async updatePackage(id: string, packageData: Partial<Package>, shopId: string) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      const shopRepository = AppDataSource.getRepository(Shop);

      const shop = await shopRepository.findOne({
        where: { id: shopId },
      });

      if (!shop) {
        throw new Error('Shop not found.');
      }

      let pkg = await packageRepository.findOne({
        where: { id, shop: { id: shopId } },
      });

      if (!pkg) {
        throw new Error('Package not found.');
      }

      pkg = { ...pkg, ...packageData };
      return await packageRepository.save(pkg);
    } catch (error) {
      console.error('Error updating package:', error);
      throw new Error('Unable to update package at the moment.');
    }
  }

  static async deletePackage(id: string, shopId: string) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      const result = await packageRepository.delete({
        id,
        shop: { id: shopId },
      });

      if (result.affected === 0) {
        throw new Error('Package not found or not authorized to delete.');
      }

      return { message: 'Package deleted successfully.' };
    } catch (error) {
      console.error('Error deleting package:', error);
      throw new Error('Unable to delete package at the moment.');
    }
  }
}
