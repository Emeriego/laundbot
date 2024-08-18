import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {authenticate} from '../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.post('/users/create', UserController.createUser);
userRoutes.get('/users', authenticate, UserController.getAllUsers);
userRoutes.get('/users/:id', authenticate, UserController.getUserById);
userRoutes.put('/users/:id', authenticate, UserController.updateUser);
userRoutes.delete('/users/:id', authenticate, UserController.deleteUser);

export default userRoutes;
