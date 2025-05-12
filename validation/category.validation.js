const Joi = require("joi");

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),
});

module.exports = categoryValidationSchema;
