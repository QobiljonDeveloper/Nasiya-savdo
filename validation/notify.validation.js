const Joi = require("joi");

const notificationValidationSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "number.base": `"user_id" must be a number`,
    "any.required": `"user_id" is required`,
  }),
  contract_id: Joi.number().integer().required().messages({
    "number.base": `"contract_id" must be a number`,
    "any.required": `"contract_id" is required`,
  }),
  notification: Joi.string().min(1).required().messages({
    "string.base": `"notification" must be a string`,
    "string.empty": `"notification" cannot be empty`,
    "any.required": `"notification" is required`,
  }),
});

module.exports = notificationValidationSchema;
