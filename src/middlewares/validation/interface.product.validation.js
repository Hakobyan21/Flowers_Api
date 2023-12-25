import { InterfaceProductSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class InterfaceProductValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, InterfaceProductSchema.addSchema, next);
  }
 
  
}

export default InterfaceProductValidation;
