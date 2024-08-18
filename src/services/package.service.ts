import AppDataSource  from '../data-source';
import { Package } from '../models/package.model';
import { Shop } from '../models/shop.model';
import { Treatment } from '../models/treatment.model';

export class PackageService {
  // {
  //   "name": "Premium Package",
  //   "treatments": ["treatment-id-1", "treatment-id-2", "treatment-id-3"]
  // }
  
  static async createPackage(packageData: Partial<Package>, shopId: string, treatmentIds: string[]) {
    try {
      const packageRepository = AppDataSource.getRepository(Package);
      const shopRepository = AppDataSource.getRepository(Shop);
      const treatmentRepository = AppDataSource.getRepository(Treatment);
  
      // Find the shop
      const shop = await shopRepository.findOne({
        where: { id: shopId },
      });
  
      if (!shop) {
        throw new Error('Shop not found.');
      }
  
      // Find treatments
      const treatments = await treatmentRepository.findBy({ id: In(treatmentIds) });
  
      if (treatments.length !== treatmentIds.length) {
        throw new Error('One or more treatments not found.');
      }
  
      // Create the package and associate treatments
      const pkg = packageRepository.create({ ...packageData, shop, treatments });
      return await packageRepository.save(pkg);
    } catch (error) {
      console.error('Error creating package:', error);
      throw new Error('Unable to create package at the moment.');
    }
  }
static async getAllPackages(shopId: string) {
  try {
    const packageRepository = AppDataSource.getRepository(Package);

    const packages = await packageRepository
      .createQueryBuilder("package")
      .leftJoinAndSelect("package.treatments", "treatment")
      .where("package.shopId = :shopId", { shopId }) // Assuming "shopId" is the foreign key in the Package entity
      .getMany();

    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw new Error('Unable to fetch packages at the moment.');
  }
}

// package.service.ts
static async getPackageById(id: string, shopId: string) {
  try {
    const packageRepository = AppDataSource.getRepository(Package);

    const pkg = await packageRepository
      .createQueryBuilder("package")
      .leftJoinAndSelect("package.treatments", "treatment") // Assuming "treatments" is the relation field name
      .where("package.id = :id", { id })
      .andWhere("package.shopId = :shopId", { shopId }) // Assuming "shopId" is the foreign key in the Package entity
      .getOne();

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
function In(treatmentIds: string[]): string | import("typeorm").FindOperator<string> {
  throw new Error('Function not implemented.');
}

