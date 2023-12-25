// NPM Modules
import Joi from "joi";

const ContactSchema = {
  editSchema: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
    body: Joi.object({
      link: Joi.string(),
      text: Joi.string(),
      title: Joi.string(),
    }),
  }
};

export default ContactSchema;
