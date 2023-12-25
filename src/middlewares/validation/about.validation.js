import { AboutSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class AboutValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AboutSchema.addSchema, next);
  }
  static validateGetArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AboutSchema.getSchema, next);
  }
  static validateEditArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AboutSchema.editSchema, next);
  }
  static validateDeleteArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, AboutSchema.deleteSchema, next);
  }
  
  
}

export default AboutValidation;
