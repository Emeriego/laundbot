import { Request, Response } from 'express';
import { PackageService } from '../services/package.service';

export class PackageController {
  static async createPackage(req: Request, res: Response) {
    try {
      const shopId = req.shop.id; // Retrieved from the middleware
      const packageData = req.body.package;
      const treatmentIds = req.body.treatmentIds; // Expecting an array of treatment IDs
  
      const pkg = await PackageService.createPackage(packageData, shopId, treatmentIds);
      res.status(201).json({ message: 'Package created successfully.', pkg });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

// package.controller.ts
static async getAllPackages(req: Request, res: Response) {
  try {
    const shopId = req.shop.id; // Retrieved from the middleware
    const packages = await PackageService.getAllPackages(shopId);

    res.status(200).json({ message: 'Packages retrieved successfully.', packages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


  static async getPackageById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shopId = req.shop.id; // Retrieved from the middleware
      const pkg = await PackageService.getPackageById(id, shopId);
      
      res.status(200).json({ message: 'Package retrieved successfully.', pkg });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePackage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const packageData = req.body;
      const shopId = req.shop.id; // Retrieved from the middleware
      const updatedPackage = await PackageService.updatePackage(id, packageData, shopId);
      res.status(200).json({ message: 'package updated successfully.', pkg: updatedPackage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePackage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shopId = req.shop.id; // Retrieved from the middleware
      await PackageService.deletePackage(id, shopId);
      res.status(200).json({ message: 'package deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
