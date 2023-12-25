// NPM Modules
import Joi from 'joi';

const InterfaceProductSchema = {
  addSchema: {
    body: Joi.object({
      address: Joi.string(),
      customerName: Joi.string(),
      distance: Joi.number().integer(),
      infoDamaphone: Joi.string(),
      infoEntrance: Joi.string(),
      infoFloor: Joi.string(),
      infoHome: Joi.string(),
      infoShipper: Joi.string(),
      mail: Joi.string().email(),
      phone: Joi.number().integer(),
      phoneNumber: Joi.string(),
      receiverName: Joi.string(),
      receiverPhone: Joi.string(),
      pay: Joi.string(),
      selected: Joi.boolean()
    })
  }

};

export default InterfaceProductSchema;
