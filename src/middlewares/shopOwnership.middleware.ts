import { Request, Response, NextFunction } from 'express';
import { Shop } from '../models/shop.model';
import AppDataSource from '../data-source';

declare global {
  namespace Express {
    interface Request {
      shop?: Shop;
    }
  }
}

export const shopOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shopRepository = AppDataSource.getRepository(Shop);
    const shop = await shopRepository.findOne({
      where: { user: { id: req.user.id } },
      relations: ['user'],
    });

    if (!shop) {
      return res.status(403).json({ message: 'Forbidden: Shop not found.' });
    }

    req.shop = shop;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error in shop ownership verification.' });
  }
};
