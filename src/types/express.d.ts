import { User } from '../models/user.model';
import { Shop } from '../models/shop.model';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      shop?: Shop;
    }
  }
}
