import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const packageRoutes = Router();
packageRoutes.use(authenticate);

packageRoutes.post('/packages/create', shopOwnershipMiddleware, PackageController.createPackages);
packageRoutes.get('/packages', shopOwnershipMiddleware, PackageController.getAllPackages);
packageRoutes.get('/packages/:id', shopOwnershipMiddleware, PackageController.getPackageById);
packageRoutes.put('/packages/:id', shopOwnershipMiddleware, PackageController.updatePackage);
packageRoutes.delete('/packages/:id', shopOwnershipMiddleware, PackageController.deletePackage);

export default packageRoutes;
