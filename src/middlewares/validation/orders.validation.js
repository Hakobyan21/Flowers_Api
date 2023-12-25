import { OrdersSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class OrdersValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, OrdersSchema.addSchema, next);
  }
}

export default OrdersValidation;
