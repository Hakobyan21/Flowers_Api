// NPM Modules
import Joi from "joi";

const AboutSchema = {
  addSchema: {
    body: Joi.object({
      name: Joi.string(),
      position: Joi.string(),
      logo: Joi.string(),
      text: Joi.string(),
      title: Joi.string(),
    }),
  },
  getSchema: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
  },
  editSchema: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
    body: Joi.object({
      name: Joi.string(),
      position: Joi.string(),
      logo: Joi.string(),
      text: Joi.string(),
      title: Joi.string(),
    }),
  },

  deleteSchema: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
  },
};

export default AboutSchema;
