import { Request, Response } from 'express';
import { TreatmentCostService } from '../services/treatmentCost.service';

/**
 * @swagger
 * tags:
 *   name: TreatmentCost
 *   description: Operations related to treatment costs
 */

/**
 * @swagger
 * /treatment-costs:
 *   post:
 *     tags: [TreatmentCost]
 *     summary: Retrieve treatment costs by package and item
 *     requestBody:
 *       description: Requires packageId and itemId to retrieve treatment costs
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageId:
 *                 type: string
 *                 description: The ID of the package
 *               itemId:
 *                 type: string
 *                 description: The ID of the item
 *             required:
 *               - packageId
 *               - itemId
 *     responses:
 *       '200':
 *         description: Treatment costs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment costs retrieved successfully."
 *                 treatmentCosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TreatmentCost'
 *       '400':
 *         description: Bad request, missing packageId or itemId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "packageId and itemId are required in the request body."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve treatment costs. Please try again later."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentCost:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         cost:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - cost
 */


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
