import { Router } from 'express';
import { TreatmentController } from '../controllers/treatment.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';
import { TreatmentCostController } from '../controllers/treatmentCost.controller';

const treatmentRoutes = Router();

treatmentRoutes.use(authenticate)
treatmentRoutes.post('/treatment-costs', TreatmentCostController.getTreatmentCostsByPackageAndItem);
treatmentRoutes.post('/treatments/create', shopOwnershipMiddleware, TreatmentController.createTreatments);
treatmentRoutes.get('/treatments', shopOwnershipMiddleware, TreatmentController.getAllTreatments);
treatmentRoutes.get('/treatments/:id', shopOwnershipMiddleware, TreatmentController.getTreatmentById);
treatmentRoutes.put('/treatments/:id', shopOwnershipMiddleware, TreatmentController.updateTreatment);
treatmentRoutes.delete('/treatments/:id', shopOwnershipMiddleware, TreatmentController.deleteTreatment);

export default treatmentRoutes;
