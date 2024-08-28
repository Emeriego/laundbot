// src/controllers/TreatmentCostController.ts

import { Request, Response } from 'express';
import { TreatmentCostService } from '../services/treatmentCost.service';

export class TreatmentCostController {
  static async getTreatmentCostsByPackageAndItem(req: Request, res: Response) {
    try {
      const { packageId, itemId } = req.body;

      if (!packageId || !itemId) {
        return res.status(400).json({ message: 'packageId and itemId are required in the request body.' });
      }

      const treatmentCosts = await TreatmentCostService.getTreatmentCostsByPackageAndItem(
        packageId,
        itemId
      );
      

      res.status(200).json({
        message: 'Treatment costs retrieved successfully.',
        treatmentCosts,
      });
    } catch (error) {
      console.error('Error retrieving treatment costs:', error);
      res.status(500).json({ message: error.message });
    }
  }
}
