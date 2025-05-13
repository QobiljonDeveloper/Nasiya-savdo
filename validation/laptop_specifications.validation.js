const Joi = require("joi");

const laptopSpecificationValidationSchema = Joi.object({
  laptop_id: Joi.number().required().messages({
    "any.required": "Laptop ID is required",
    "number.base": "Laptop ID must be a number",
  }),
  feature_id: Joi.number().required().messages({
    "any.required": "Feature ID is required",
    "number.base": "Feature ID must be a number",
  }),
  value: Joi.string().min(1).required().messages({
    "any.required": "Value is required",
    "string.base": "Value must be a string",
    "string.min": "Value must be at least 1 character long",
    "string.max": "Value must be less than or equal to 255 characters",
  }),
});

module.exports = laptopSpecificationValidationSchema;
