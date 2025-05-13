const Joi = require("joi");

const featureValidationSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
  is_main: Joi.boolean().messages({
    "boolean.base": `"is_main" should be a type of 'boolean'`,
    "any.required": `"is_main" is a required field`,
  }),
  value_type: Joi.string().min(3).messages({
    "string.base": `"value_type" should be a type of 'text'`,
    "string.empty": `"value_type" cannot be an empty field`,
    "any.required": `"value_type" is a required field`,
  }),
});

module.exports = featureValidationSchema;
