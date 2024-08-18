import AppDataSource from '../data-source';
import { Treatment } from '../models/treatment.model';
import { Package } from '../models/package.model';
import { TreatmentCost } from '../models/treatmentCost.model';
import { Item } from '../models/item.model';

export class TreatmentService {

  static async createTreatment(treatmentData: Partial<Treatment>, costs: { itemId: string, cost: number }[]) {
    try {
      const treatmentRepository = AppDataSource.getRepository(Treatment);
      const itemRepository = AppDataSource.getRepository(Item);
      const treatmentCostRepository = AppDataSource.getRepository(TreatmentCost);

      // Create the treatment
      const treatment = treatmentRepository.create(treatmentData);
      await treatmentRepository.save(treatment);

      // Create treatment costs for each item
      for (const cost of costs) {
        const item = await itemRepository.findOne({ where: { id: cost.itemId } });

        if (!item) {
          throw new Error(`Item with id ${cost.itemId} not found.`);
        }

        const treatmentCost = treatmentCostRepository.create({
          treatment,
          item,
          cost: cost.cost,
        });

        await treatmentCostRepository.save(treatmentCost);
      }

      return treatment;
    } catch (error) {
      console.error('Error creating treatment:', error);
      throw new Error('Unable to create treatment at the moment.');
    }
  }
  // static async createTreatment(treatmentData: Partial<Treatment>, packageIds: string[], costs: { itemId: string, cost: number }[]) {
  //   try {
  //     const treatmentRepository = AppDataSource.getRepository(Treatment);
  //     const packageRepository = AppDataSource.getRepository(Package);
  //     const itemRepository = AppDataSource.getRepository(Item);
  //     const treatmentCostRepository = AppDataSource.getRepository(TreatmentCost);

  //     // Ensure packages exist using findBy with In operator
  //     const packages = await packageRepository.findBy({ id: In(packageIds) });

  //     if (packages.length !== packageIds.length) {
  //       throw new Error('One or more packages not found.');
  //     }

  //     // Create the treatment
  //     const treatment = treatmentRepository.create({ ...treatmentData, packages });
  //     await treatmentRepository.save(treatment);

  //     // Create treatment costs for each item
  //     for (const cost of costs) {
  //       const item = await itemRepository.findOne({ where: { id: cost.itemId } });

  //       if (!item) {
  //         throw new Error(`Item with id ${cost.itemId} not found.`);
  //       }

  //       const treatmentCost = treatmentCostRepository.create({
  //         treatment,
  //         item,
  //         cost: cost.cost,
  //       });

  //       await treatmentCostRepository.save(treatmentCost);
  //     }

  //     return treatment;
  //   } catch (error) {
  //     console.error('Error creating treatment:', error);
  //     throw new Error('Unable to create treatment at the moment.');
  //   }
  // }
  static async getAllTreatments() {
    try {
      const treatmentRepository = AppDataSource.getRepository(Treatment);
      return await treatmentRepository.find({ relations: ['treatmentCosts', 'treatmentCosts.item'] });
    } catch (error) {
      console.error('Error fetching treatments:', error);
      throw new Error('Unable to fetch treatments at the moment.');
    }
  }

  static async getTreatmentById(id: string) {
    try {
      const treatmentRepository = AppDataSource.getRepository(Treatment);
      const treatment = await treatmentRepository.findOne({
        where: { id },
        relations: ['treatmentCosts', 'treatmentCosts.item'],
      });

      if (!treatment) {
        throw new Error('Treatment not found.');
      }

      return treatment;
    } catch (error) {
      console.error('Error fetching treatment:', error);
      throw new Error('Unable to fetch treatment at the moment.');
    }
  }

  static async updateTreatment(id: string, treatmentData: Partial<Treatment>, costs: { itemId: string, cost: number }[]) {
    try {
      const treatmentRepository = AppDataSource.getRepository(Treatment);
      const itemRepository = AppDataSource.getRepository(Item);
      const treatmentCostRepository = AppDataSource.getRepository(TreatmentCost);

      let treatment = await treatmentRepository.findOne({
        where: { id },
        relations: ['treatmentCosts'],
      });

      if (!treatment) {
        throw new Error('Treatment not found.');
      }

      // Update treatment data
      treatment = { ...treatment, ...treatmentData };
      await treatmentRepository.save(treatment);

      // Update or create treatment costs
      for (const cost of costs) {
        const item = await itemRepository.findOne({ where: { id: cost.itemId } });

        if (!item) {
          throw new Error(`Item with id ${cost.itemId} not found.`);
        }

        let treatmentCost = await treatmentCostRepository.findOne({
          where: { treatment: { id: treatment.id }, item: { id: item.id } },
        });

        if (treatmentCost) {
          // Update existing cost
          treatmentCost.cost = cost.cost;
        } else {
          // Create new cost entry
          treatmentCost = treatmentCostRepository.create({
            treatment,
            item,
            cost: cost.cost,
          });
        }

        await treatmentCostRepository.save(treatmentCost);
      }

      return treatment;
    } catch (error) {
      console.error('Error updating treatment:', error);
      throw new Error('Unable to update treatment at the moment.');
    }
  }

  static async deleteTreatment(id: string) {
    try {
      const treatmentRepository = AppDataSource.getRepository(Treatment);
      const result = await treatmentRepository.delete({ id });

      if (result.affected === 0) {
        throw new Error('Treatment not found or not authorized to delete.');
      }

      return { message: 'Treatment deleted successfully.' };
    } catch (error) {
      console.error('Error deleting treatment:', error);
      throw new Error('Unable to delete treatment at the moment.');
    }
  }
}
function In(packageIds: string[]): string | import("typeorm").FindOperator<string> {
  throw new Error('Function not implemented.');
}

