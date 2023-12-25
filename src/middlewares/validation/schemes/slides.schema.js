// NPM Modules
import Joi from 'joi';

const SlidesSchema = {

  addSchema: {
    body: Joi.object({
      src: Joi.string().required(),
      alt: Joi.string().required(),
      link: Joi.string(),
      text: Joi.string()
    })
  }

};

export default SlidesSchema;
