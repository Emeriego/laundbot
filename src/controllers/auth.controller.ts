import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { firstname, lastname, address, phone, email, password } = req.body;
      const user = await authService.register(firstname, lastname, address, phone, email, password);
      res.status(201).json({message: "User succesfully registered", user});
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

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async googleSignup(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const user = await authService.googleSignup(token);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
