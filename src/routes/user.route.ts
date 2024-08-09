import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {authenticate} from '../middlewares/auth.middleware';

const router = Router();

router.post('/', UserController.createUser);
router.get('/', authenticate, UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

export default router;
