import { Router } from 'express';
import { TreatmentController } from '../controllers/treatment.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const router = Router();

router.post('/', shopOwnershipMiddleware, TreatmentController.createTreatment);
router.get('/', shopOwnershipMiddleware, TreatmentController.getAllTreatments);
router.get('/:id', shopOwnershipMiddleware, TreatmentController.getTreatmentById);
router.put('/:id', shopOwnershipMiddleware, TreatmentController.updateTreatment);
router.delete('/:id', shopOwnershipMiddleware, TreatmentController.deleteTreatment);

export default router;
