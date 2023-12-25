// NPM Modules
import Joi from 'joi';

const OrdersSchema = {

  addSchema: {
    body: Joi.object({
      company_name: Joi.string().required(),
      receiver_name: Joi.string().required(),
      receiver_phone: Joi.string().required(),
      sender_name: Joi.string().required(),
      sender_phone: Joi.string().required(),
      sender_phone2: Joi.string(),
      delivery_state: Joi.string().required(),
      delivery_city: Joi.string().required(),
      delivery_address: Joi.string().required(),
      delivery_year: Joi.string().required(),
      delivery_month: Joi.string().required(),
      delivery_day: Joi.string().required(),
      delivery_time: Joi.string().required(),
      delivery_text: Joi.string(),
      delivery_count: Joi.number().required(),
      payment_status: Joi.string().required(),
      picture: Joi.string().required(),
      size: Joi.string().required(),
      category_name: Joi.string().required(),
      price: Joi.number().required(),
      flower_name: Joi.string().required()
    })
  }

};

export default OrdersSchema;
