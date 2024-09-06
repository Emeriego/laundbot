import { Request, Response } from 'express';
import { PackageService } from '../services/package.service';

/**
 * @swagger
 * tags:
 *   name: Package
 *   description: Operations related to packages
 */

/**
 * @swagger
 * /packages:
 *   post:
 *     tags: [Package]
 *     summary: Create a new package for a shop
 *     requestBody:
 *       description: Package and associated treatments to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packages:
 *                 type: object
 *                 properties:
 *                   package:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                     required:
 *                       - name
 *                   treatments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                     example: [{ "id": "some-uuid" }]
 *             required:
 *               - packages
 *     responses:
 *       '201':
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package created successfully."
 *                 pkg:
 *                   $ref: '#/components/schemas/Package'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No packages data provided."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create package. Please try again later."
 */

/**
 * @swagger
 * /packages:
 *   post:
 *     tags: [Package]
 *     summary: Create multiple packages for a shop
 *     requestBody:
 *       description: Array of packages and their associated treatments to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pkgData:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                       required:
 *                         - name
 *                     treatments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *             required:
 *               - packages
 *     responses:
 *       '201':
 *         description: Packages created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "2 package(s) created successfully."
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No packages data provided."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create packages. Please try again later."
 */

/**
 * @swagger
 * /packages:
 *   get:
 *     tags: [Package]
 *     summary: Retrieve all packages for a shop
 *     responses:
 *       '200':
 *         description: Packages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Packages retrieved successfully."
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve packages. Please try again later."
 */

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     tags: [Package]
 *     summary: Retrieve a package by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the package
 *     responses:
 *       '200':
 *         description: Package retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package retrieved successfully."
 *                 pkg:
 *                   $ref: '#/components/schemas/Package'
 *       '404':
 *         description: Package not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve package. Please try again later."
 */

/**
 * @swagger
 * /packages/{id}:
 *   put:
 *     tags: [Package]
 *     summary: Update a package by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the package
 *     requestBody:
 *       description: Updated package details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package updated successfully."
 *                 pkg:
 *                   $ref: '#/components/schemas/Package'
 *       '404':
 *         description: Package not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update package. Please try again later."
 */

/**
 * @swagger
 * /packages/{id}:
 *   delete:
 *     tags: [Package]
 *     summary: Delete a package by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the package
 *     responses:
 *       '200':
 *         description: Package deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package deleted successfully."
 *       '404':
 *         description: Package not found or does not belong to this shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Package with ID {id} not found or does not belong to this shop."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete package. Please try again later."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 */


export class PackageController {
  static async createPackage(req: Request, res: Response) {
    try {
      const shopId = req.shop.id; // Retrieved from the middleware
      const packageData = req.body.packages.package;
      const treatmentIds = req.body.packages.treatments; // Expecting an array of treatment IDs
  
      const pkg = await PackageService.createPackage(packageData, shopId, treatmentIds);
      res.status(201).json({ message: 'Package created successfully.', pkg });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  static async createPackages(req: Request, res: Response) {
    try {
      const shopId = req.shop.id; // Assuming req.shop.id is correctly set
      const packagesData = req.body.packages;
  
      if (!Array.isArray(packagesData) || packagesData.length === 0) {
        return res.status(400).json({ message: 'No packages data provided.' });
      }
  
      const createdPackages = [];
  
      for (const packageData of packagesData) {
        const { pkgData, treatments } = packageData; // Assuming each packageData has `pkgData` and `treatments`
        const treatmentIds = treatments.map(t => t.id);
  
        if (!pkgData || !pkgData.name) {
          return res.status(400).json({ message: 'Each package must have a name.' });
        }
  
        console.log("controllerrrrXX", treatments, treatmentIds);
  
        const pkg = await PackageService.createPackage(pkgData, shopId, treatmentIds);
        createdPackages.push(pkg);
      }
  
      res.status(201).json({
        message: `${createdPackages.length} package(s) created successfully.`,
        packages: createdPackages,
      });
    } catch (error) {
      console.error('Error creating packages:', error);
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
