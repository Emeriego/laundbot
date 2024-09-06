import { Request, Response } from 'express';
import { TreatmentService } from '../services/treatment.service';

/**
 * @swagger
 * tags:
 *   name: Treatment
 *   description: Operations related to treatments
 */

/**
 * @swagger
 * /treatments:
 *   post:
 *     tags: [Treatment]
 *     summary: Create multiple treatments
 *     requestBody:
 *       description: Array of treatments with associated costs to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treatments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     treatment:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                       required:
 *                         - name
 *                     costs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           itemId:
 *                             type: string
 *                           cost:
 *                             type: number
 *             required:
 *               - treatments
 *     responses:
 *       '201':
 *         description: Treatments created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "2 treatment(s) created successfully."
 *                 treatments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Treatment'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No treatments data provided."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create treatments. Please try again later."
 */

/**
 * @swagger
 * /treatments:
 *   get:
 *     tags: [Treatment]
 *     summary: Retrieve all treatments
 *     responses:
 *       '200':
 *         description: Treatments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatments retrieved successfully."
 *                 treatments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Treatment'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve treatments. Please try again later."
 */

/**
 * @swagger
 * /treatments/{id}:
 *   get:
 *     tags: [Treatment]
 *     summary: Retrieve a treatment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the treatment
 *     responses:
 *       '200':
 *         description: Treatment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment retrieved successfully."
 *                 treatment:
 *                   $ref: '#/components/schemas/Treatment'
 *       '404':
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment with ID {id} not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve treatment. Please try again later."
 */

/**
 * @swagger
 * /treatments/{id}:
 *   put:
 *     tags: [Treatment]
 *     summary: Update a treatment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the treatment
 *     requestBody:
 *       description: Updated treatment details and costs
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treatment:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                 required:
 *                   - name
 *               costs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     cost:
 *                       type: number
 *             required:
 *               - treatment
 *     responses:
 *       '200':
 *         description: Treatment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment updated successfully."
 *                 treatment:
 *                   $ref: '#/components/schemas/Treatment'
 *       '404':
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment with ID {id} not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update treatment. Please try again later."
 */

/**
 * @swagger
 * /treatments/{id}:
 *   delete:
 *     tags: [Treatment]
 *     summary: Delete a treatment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the treatment
 *     responses:
 *       '200':
 *         description: Treatment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment deleted successfully."
 *       '404':
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment with ID {id} not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete treatment. Please try again later."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Treatment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
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


export class TreatmentController {
  
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
