// NPM Modules
import express from 'express';

// Local Modules
import { FooterController } from '../controller';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/all/:key',
  FooterController.getAllFootersByKey);

router.put('/:key/:id', FooterController.updateFooterById);

export default router;
