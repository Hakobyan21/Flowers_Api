import { SlidesSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class SlidesValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, SlidesSchema.addSchema, next);
  }
}

export default SlidesValidation;
