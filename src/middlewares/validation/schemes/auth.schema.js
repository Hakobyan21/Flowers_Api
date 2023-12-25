// NPM modules
import Joi from 'joi';

const AuthSchema = {
  loginSchema: {
    body: Joi.object({
      password: Joi.string().min(5).required(),
      email: Joi.string(),
      adminname: Joi.string().min(1).required()
    })
  }
};

export default AuthSchema;
