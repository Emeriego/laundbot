import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { shopOwnershipMiddleware } from '../middlewares/shopOwnership.middleware';

const router = Router();

router.post('/', shopOwnershipMiddleware, PackageController.createPackage);
router.get('/', shopOwnershipMiddleware, PackageController.getAllPackages);
router.get('/:id', shopOwnershipMiddleware, PackageController.getPackageById);
router.put('/:id', shopOwnershipMiddleware, PackageController.updatePackage);
router.delete('/:id', shopOwnershipMiddleware, PackageController.deletePackage);

export default router;
