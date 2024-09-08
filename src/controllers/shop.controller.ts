//@ts-nocheck
import { Request, Response } from 'express';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop.model';
import path from 'path';
import multer from 'multer';
// const path = require('path');
// const multer = require('multer');


/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: Operations related to shops
 */

/**
 * @swagger
 * /shops:
 *   post:
 *     tags: [Shop]
 *     summary: Create a new shop
 *     requestBody:
 *       description: Shop details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My New Shop
 *               imageUrl:
 *                 type: string
 *                 example: http://example.com/image.jpg
 *               location:
 *                 type: string
 *                 example: 123 Main Street
 *               description:
 *                 type: string
 *                 example: A great place to shop
 *               phone:
 *                 type: string
 *                 example: 555-1234
 *             required:
 *               - name
 *               - imageUrl
 *               - location
 *               - description
 *               - phone
 *     responses:
 *       '201':
 *         description: Shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shop created successfully.
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *       '400':
 *         description: User already owns a shop
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already owns a shop. You cannot create another one.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /shops:
 *   get:
 *     tags: [Shop]
 *     summary: Get all shops
 *     responses:
 *       '200':
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shops retrieved successfully.
 *                 shops:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shop'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /shops/{id}:
 *   get:
 *     tags: [Shop]
 *     summary: Get a shop by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the shop
 *     responses:
 *       '200':
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shop retrieved successfully.
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /shops/user/{userId}:
 *   get:
 *     tags: [Shop]
 *     summary: Get a shop by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shop retrieved successfully.
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /shops/{id}:
 *   put:
 *     tags: [Shop]
 *     summary: Update a shop by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the shop
 *     requestBody:
 *       description: Updated shop details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Shop Name
 *               imageUrl:
 *                 type: string
 *                 example: http://example.com/new-image.jpg
 *               location:
 *                 type: string
 *                 example: 456 Another Street
 *               description:
 *                 type: string
 *                 example: An updated description
 *               phone:
 *                 type: string
 *                 example: 555-5678
 *             required:
 *               - name
 *               - imageUrl
 *               - location
 *               - description
 *               - phone
 *     responses:
 *       '200':
 *         description: Shop updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shop updated successfully.
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

/**
 * @swagger
 * /shops/{id}:
 *   delete:
 *     tags: [Shop]
 *     summary: Delete a shop by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the shop
 *     responses:
 *       '200':
 *         description: Shop deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shop deleted successfully.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */



export class ShopController {
  static async createShop2(req: Request, res: Response) {
    try {
      const shopData = req.body;
      const userId = req.user.id;  // Assuming req.user contains the authenticated user

      // Check if the user already has a shop
      const existingShop = await ShopService.getShopByUserId(userId);

      if (existingShop) {
        return res.status(400).json({ message: 'User already owns a shop. You cannot create another one.' });
      }

      // Proceed to create the new shop
      const shop = await ShopService.createShop(shopData, userId);
      res.status(201).json({ message: 'Shop created successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createShop(req: Request, res: Response) {
    try {
      // Check if the image file is provided and uploaded successfully
      const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

      const shopData = {
        ...req.body, // Shop data from the request body
        imageUrl,    // Attach the image URL to the shop data
      };

      const userId = req.user.id;  // Assuming req.user contains the authenticated user

      // Check if the user already has a shop
      const existingShop = await ShopService.getShopByUserId(userId);

      if (existingShop) {
        return res.status(400).json({ message: 'User already owns a shop. You cannot create another one.' });
      }

      // Proceed to create the new shop with the image
      const shop = await ShopService.createShop(shopData, userId);
      res.status(201).json({ message: 'Shop created successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async uploadShopImage(req: Request, res: Response) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads'); // Set the uploads folder
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
        }
      },
    });

    // Middleware to handle single file uploads
    const uploadImage = upload.single('image');

    try {
      // Invoke the middleware function
      uploadImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred
          return res.status(400).json({ message: 'Multer error: ' + err.message });
        } else if (err) {
          // An unknown error occurred
          return res.status(400).json({ message: 'Error: ' + err.message });
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded or invalid file type!' });
        }

        // Everything went fine. Send feedback to the client
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // Generate file URL
        return res.status(200).json({
          message: 'File uploaded successfully!',
          fileUrl: fileUrl, // Return the file URL
          fileName: req.file.filename,
        });
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'An error occurred while uploading the file.' });
    }
  }


  static async getAllShops(req: Request, res: Response) {
    try {
      const shops = await ShopService.getAllShops();
      res.status(200).json({ message: 'Shops retrieved successfully.', shops });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShopById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shop = await ShopService.getShopById(id);
      res.status(200).json({ message: 'Shop retrieved successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getShopByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const shop = await ShopService.getShopByUserId(userId);
      res.status(200).json({ message: 'Shop retrieved successfully.', shop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shopData = req.body;
      const updatedShop = await ShopService.updateShop(id, shopData);
      res.status(200).json({ message: 'Shop updated successfully.', shop: updatedShop });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteShop(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ShopService.deleteShop(id);
      res.status(200).json({ message: 'Shop deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
