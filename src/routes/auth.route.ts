import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/auth/register', authController.register);
authRoute.post('/auth/login', authController.login);
authRoute.post('/auth/forgot-password', authController.forgotPassword);
authRoute.post('/auth/google-signup', authController.googleSignup);

export default authRoute;
