// NPM Modules
import express from 'express';

// Local Modules
import { superAdminController } from '../controller';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get(
  '/getAllProducts',
  //   AuthMiddleware.authenticateFor(['superAdmin']),
  superAdminController.getAllProducts
);

export default router;
