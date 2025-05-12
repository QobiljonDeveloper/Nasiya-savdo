const Joi = require("joi");

const paymentValidationSchema = Joi.object({
  contract_id: Joi.number().integer().required().messages({
    "number.base": `"contract_id" must be a number`,
    "any.required": `"contract_id" is required`,
  }),
  amount_paid: Joi.number().positive().precision(2).required().messages({
    "number.base": `"amount_paid" must be a valid number`,
    "number.positive": `"amount_paid" must be greater than zero`,
    "any.required": `"amount_paid" is required`,
  }),
  payment_method: Joi.string()
    .valid("cash", "card", "online")
    .required()
    .messages({
      "any.only": `"payment_method" must be one of ['cash', 'card', 'online']`,
      "any.required": `"payment_method" is required`,
    }),
  paid_date: Joi.date().iso().required().messages({
    "date.base": `"paid_date" must be a valid ISO date`,
    "any.required": `"paid_date" is required`,
  }),
});

module.exports = paymentValidationSchema;
