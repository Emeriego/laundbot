import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.post('/forgot-password', authController.forgotPassword);
authRoute.post('/google-signup', authController.googleSignup);

export default authRoute;
