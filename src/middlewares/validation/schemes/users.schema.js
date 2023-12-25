// NPM Modules
import Joi from 'joi';

const UsersSchema = {

  signupSchema: {
    body: Joi.object({
      adminname: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      avc: Joi.string().required(),
      bank_account: Joi.string().required(),
      password: Joi.string().min(7).required(),
      company_name: Joi.string().min(1).required(),
      phone: Joi.string().min(8).required(),
      address: Joi.string().min(1).required(),
      logo: Joi.string(),
      info: Joi.string(),
      payment_method: Joi.array()
    })
  },

  mailSchema: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      email:Joi.string().email().required(),
      text: Joi.string().min(3).required()
    })
  }

};

export default UsersSchema;
