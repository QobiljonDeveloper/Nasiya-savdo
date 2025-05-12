const Joi = require("joi");

const warrantyValidationSchema = Joi.object({
  contract_id: Joi.number().integer().required().messages({
    "any.required": `"contract_id" is required`,
    "number.base": `"contract_id" must be a number`,
  }),
  warranty_period_month: Joi.number().integer().min(1).required().messages({
    "any.required": `"warranty_period_month" is required`,
    "number.base": `"warranty_period_month" must be a number`,
    "number.min": `"warranty_period_month" must be at least 1`,
  }),
  warranty_start: Joi.date().required().messages({
    "any.required": `"warranty_start" is required`,
    "date.base": `"warranty_start" must be a valid date`,
  }),
  warranty_end: Joi.date().required().messages({
    "any.required": `"warranty_end" is required`,
    "date.base": `"warranty_end" must be a valid date`,
  }),
});

module.exports = warrantyValidationSchema;
