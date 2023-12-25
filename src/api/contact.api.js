// NPM Modules
import express from 'express';

// Local Modules
import { ContactController } from '../controller';
import { ContactValidationMiddleware } from '../middlewares/validation/index';

// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/', ContactController.getAll);

router.put('/:id',
  ContactValidationMiddleware.validateEditArgs,
  ContactController.editDetails);

export default router;
