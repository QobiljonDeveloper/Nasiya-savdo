const Joi = require("joi");

const laptopValidationSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name should have at least 3 characters.",
    "string.max": "Name should have at most 255 characters.",
    "any.required": "Name is required.",
  }),
  brand_id: Joi.number().integer().positive().required().messages({
    "number.base": "Brand ID must be a number.",
    "number.positive": "Brand ID must be a positive integer.",
    "any.required": "Brand ID is required.",
  }),
  price: Joi.number().precision(2).positive().required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive number.",
    "any.required": "Price is required.",
  }),
  quantity: Joi.number().integer().positive().required().messages({
    "number.base": "Quantity must be a number.",
    "number.positive": "Quantity must be a positive integer.",
    "any.required": "Quantity is required.",
  }),
  release_date: Joi.date().required().messages({
    "date.base": "Release date must be a valid date.",
    "any.required": "Release date is required.",
  }),
  category_id: Joi.number().integer().positive().required().messages({
    "number.base": "Category ID must be a number.",
    "number.positive": "Category ID must be a positive integer.",
    "any.required": "Category ID is required.",
  }),
});

module.exports = laptopValidationSchema;
