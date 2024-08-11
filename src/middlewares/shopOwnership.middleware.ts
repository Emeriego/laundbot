import { Request, Response, NextFunction } from 'express';
import { Shop } from '../models/shop.model';
import { User } from '../models/user.model';
import AppDataSource from '../data-source';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Assuming user is of type User
      shop?: Shop;
    }
  }
}
// Updated shopOwnershipMiddleware
export const shopOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shopRepository = AppDataSource.getRepository(Shop);
    
    // Ensure user ID is properly retrieved
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized: No user ID provided.' });
    }

    // Fetch the shop where the user is the owner
    const shop = await shopRepository.findOne({
      where: {
        user: {
          id: req.user.id,
        },
      },
    });

    if (!shop) {
      return res.status(403).json({ message: 'Forbidden: Shop not found.' });
    }

    req.shop = shop;
    next();
  } catch (error) {
    console.error('Error in shop ownership verification:', error);
    res.status(500).json({ message: 'Error in shop ownership verification.' });
  }
};


// export const shopOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const shopRepository = AppDataSource.getRepository(Shop);

//     // Find the shop where the user is the owner (One-to-One relationship)
//     const shop = await shopRepository.findOne({
//       where: { user: { id: req.user.id } }, // No need for relations: ['user'] since it's One-to-One
//     });

//     if (!shop) {
//       return res.status(403).json({ message: 'Forbidden: Shop not found.' });
//     }

//     req.shop = shop;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: 'Error in shop ownership verification.' });
//   }
// };
