import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import AppDataSource from '../data-source';
import config from '../config';

export interface AuthRequest extends Request {
  user?: User; // Ensure user is the full User object
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET) as { id: string };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Now req.user is the full User object

    next();
  } catch (error) {
    console.error('Error verifying token:', error); // Log the error for debugging
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
