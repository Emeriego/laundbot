import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);
      res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ message: 'Users retrieved successfully.', users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json({ message: 'User retrieved successfully.', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await UserService.updateUser(id, userData);
      res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
