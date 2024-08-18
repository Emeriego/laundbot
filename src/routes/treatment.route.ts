import { appendBaseUrl } from 'expo-router/build/fork/getPathFromState';
import { Router } from 'express';
import { TreatmentController } from '../controllers/treatment.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const treatmentRoutes = Router();

treatmentRoutes.use(authenticate)

treatmentRoutes.post('/treatments/create', shopOwnershipMiddleware, TreatmentController.createTreatment);
treatmentRoutes.get('/treatments', shopOwnershipMiddleware, TreatmentController.getAllTreatments);
treatmentRoutes.get('/treatments/:id', shopOwnershipMiddleware, TreatmentController.getTreatmentById);
treatmentRoutes.put('/treatments/:id', shopOwnershipMiddleware, TreatmentController.updateTreatment);
treatmentRoutes.delete('/treatments/:id', shopOwnershipMiddleware, TreatmentController.deleteTreatment);

export default treatmentRoutes;
