import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       description: User registration details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               phone:
 *                 type: string
 *                 example: 555-1234
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in a user
 *     requestBody:
 *       description: User login credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *                 token:
 *                   type: string
 *                   example: jwt-token-example
 *       '400':
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 */

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset link
 *     requestBody:
 *       description: User email to send password reset link
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Password reset link sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset link sent
 *       '400':
 *         description: Invalid email address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email address
 */

/**
 * @swagger
 * /google-signup:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up a user with Google token
 *     requestBody:
 *       description: Google token for user authentication
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: google-token-example
 *             required:
 *               - token
 *     responses:
 *       '200':
 *         description: Successful Google signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Error with Google token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error with Google token
 */

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { firstname, lastname, address, phone, email, password } = req.body;
      const user = await authService.register(firstname, lastname, address, phone, email, password);
      res.status(201).json({message: "User successfully registered", user});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { shop, token } = await authService.login(email, password);
      res.status(200).json({ shop, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async googleSignup(req: Request, res: Response) {
    try {
      const token = req.body.token;
      const user = await authService.googleSignup(token);

      return res.status(200).json({
        message: 'Google signup successful',
        user,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
