import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/auth/google-signup', authController.googleSignup);
authRoute.post('/auth/register', authController.register);
authRoute.post('/auth/login', authController.login);
authRoute.post('/auth/forgot-password', authController.forgotPassword);

export default authRoute;
