// src/services/TreatmentCostService.ts

import AppDataSource from '../data-source';
import { TreatmentCost } from '../models/treatmentCost.model';
import { Package } from '../models/package.model';
import { Item } from '../models/item.model';
import { In } from 'typeorm';

export class TreatmentCostService {
  private static treatmentCostRepository = AppDataSource.getRepository(TreatmentCost);
  private static packageRepository = AppDataSource.getRepository(Package);
  private static itemRepository = AppDataSource.getRepository(Item);

  static async getTreatmentCostsByPackageAndItem(packageId: string, itemId: string): Promise<TreatmentCost[]> {
    const pkg = await this.packageRepository.findOne({
      where: { id: packageId },
      relations: ['treatments'],
    });

    if (!pkg) {
      throw new Error('Package not found.');
    }

    if (!pkg.treatments || pkg.treatments.length === 0) {
      throw new Error('No treatments associated with this package.');
    }

    const item = await this.itemRepository.findOne({ where: { id: itemId } });

    if (!item) {
      throw new Error('Item not found.');
    }

    const treatmentIds = pkg.treatments.map((treatment) => treatment.id);

    const treatmentCosts = await this.treatmentCostRepository.find({
      where: {
        treatment: { id: In(treatmentIds) },
        item: { id: itemId },
      },
      relations: ['treatment', 'item'],
    });

    if (treatmentCosts.length === 0) {
      throw new Error('No treatment costs found for the given package and item.');
    }

    return treatmentCosts;
  }
}
