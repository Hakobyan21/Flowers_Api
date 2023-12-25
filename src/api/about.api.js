// NPM Modules
import express from 'express';

// Local Modules
import { AboutController } from '../controller';
import { AboutValidationMiddleware } from '../middlewares/validation/index';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get(
  '/:id',
  AboutValidationMiddleware.validateGetArgs,
  AboutController.getAboutById
);

router.get('/', AboutController.getAll);

router.post(
  '/',
  AboutValidationMiddleware.validateAddArgs,
  AboutController.addDetails
);
router.put('/:id',
  AboutValidationMiddleware.validateEditArgs,
  AboutController.editDetails);

router.delete('/:id',
  AboutValidationMiddleware.validateDeleteArgs,
  AboutController.deleteDetails);

export default router;
