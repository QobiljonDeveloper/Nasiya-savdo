const Joi = require("joi");

const userValidationSchema = Joi.object({
  full_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .length(16)
    .pattern(/^\d{3}-\d{2}-\d{3}-\d{2}-\d{2}$/)
    .required(),
  address: Joi.string().min(10).required(),
  location: Joi.string().min(3).required(),
  passport_id: Joi.string().min(7).max(20).required(),
  card_number: Joi.string()
    .pattern(/^[0-9\s]+$/)
    .length(16)
    .required(),
});

module.exports = userValidationSchema;
