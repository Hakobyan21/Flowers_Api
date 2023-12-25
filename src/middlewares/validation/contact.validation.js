import { ContactSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class ContactValidation {
  static validateEditArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, ContactSchema.editSchema, next);
  }  
}

export default ContactValidation;
