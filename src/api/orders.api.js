// NPM Modules
import express from 'express';

// Local Modules

import { OrdersController } from '../controller';
// import OrdersValidation from '../middlewares/validation/orders.validation';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.post('/add',
  // OrdersValidation.validateAddArgs,
  OrdersController.add);
router.post('/price', OrdersController.getPriceOrder);
router.get('/order/:id', OrdersController.getById);
router.put('/status', OrdersController.editOrderStatus);
router.get('/:users_id/:order_status', OrdersController.getAllHistory);

router.get('/:users_id/:branch_address/:order_status', OrdersController.getHistoryByBranch);

export default router;
