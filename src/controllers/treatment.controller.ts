import { Request, Response } from 'express';
import { TreatmentService } from '../services/treatment.service';

export class TreatmentController {
  // static async createTreatment(req: Request, res: Response) {
  //   try {
  //     const treatmentData = req.body.treatment;
  //     const costs = req.body.costs; // Expecting an array of { itemId: string, cost: number }

  //     const treatment = await TreatmentService.createTreatment(treatmentData, costs);
  //     res.status(201).json({ message: 'Treatment created successfully.', treatment });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }


  static async createTreatments(req: Request, res: Response) {
    try {
      const treatmentsData = req.body.treatments; // Expecting an array of treatment objects
  
      if (!Array.isArray(treatmentsData) || treatmentsData.length === 0) {
        return res.status(400).json({ message: 'No treatments data provided.' });
      }
  
      const createdTreatments = [];
  
      for (const treatmentData of treatmentsData) {
        const { treatment, costs } = treatmentData; // Assuming each treatmentData has `treatment` and `costs`
        // console.log("controller",treatment, costs);
        const createdTreatment = await TreatmentService.createTreatment(treatment, costs);
        createdTreatments.push(createdTreatment);
      }
  
      res.status(201).json({
        message: `${createdTreatments.length} treatment(s) created successfully.`,
        treatments: createdTreatments,
      });
    } catch (error) {
      console.error('Error creating treatments:', error);
      res.status(500).json({ message: error.message });
    }
  }
  


  // {
  //   "treatments": [
  //     {
  //       "treatment": { "name": "Deluxe Treatment" },
  //       "costs": [
  //         { "itemId": "item1", "cost": 10.0 },
  //         { "itemId": "item2", "cost": 15.0 }
  //       ]
  //     },
  //     {
  //       "treatment": { "name": "Basic Treatment" },
  //       "costs": [
  //         { "itemId": "item3", "cost": 5.0 },
  //         { "itemId": "item4", "cost": 7.5 }
  //       ]
  //     }
  //   ]
  // }
  
  
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
