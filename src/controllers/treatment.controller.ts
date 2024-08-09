import { Request, Response } from 'express';
import { TreatmentService } from '../services/treatment.service';

export class TreatmentController {
  static async createTreatment(req: Request, res: Response) {
    try {
      const treatmentData = req.body.treatment;
      const { packageId } = req.params;  // assuming packageId is passed as a URL parameter
      const costs = req.body.costs; // Expecting an array of { itemId: string, cost: number }

      const treatment = await TreatmentService.createTreatment(treatmentData, packageId, costs);
      res.status(201).json({ message: 'Treatment created successfully.', treatment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllTreatments(req: Request, res: Response) {
    try {
      const treatments = await TreatmentService.getAllTreatments();
      res.status(200).json({ message: 'Treatments retrieved successfully.', treatments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTreatmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const treatment = await TreatmentService.getTreatmentById(id);
      res.status(200).json({ message: 'Treatment retrieved successfully.', treatment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTreatment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const treatmentData = req.body.treatment;
      const costs = req.body.costs; // Expecting an array of { itemId: string, cost: number }

      const updatedTreatment = await TreatmentService.updateTreatment(id, treatmentData, costs);
      res.status(200).json({ message: 'Treatment updated successfully.', treatment: updatedTreatment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteTreatment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TreatmentService.deleteTreatment(id);
      res.status(200).json({ message: 'Treatment deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
