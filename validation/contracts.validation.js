const Joi = require("joi");

const contractValidationSchema = Joi.object({
  customer_id: Joi.number().required().messages({
    "any.required": "Customer ID is required",
    "number.base": "Customer ID must be a number",
  }),
  laptop_id: Joi.number().required().messages({
    "any.required": "Laptop ID is required",
    "number.base": "Laptop ID must be a number",
  }),
  contract_date: Joi.date().required().messages({
    "any.required": "Contract date is required",
    "date.base": "Contract date must be a valid date",
  }),
  duration_month: Joi.number().valid(5, 10, 15).required().messages({
    "any.required": "Duration month is required",
    "number.base": "Duration month must be a number",
    "any.only": "Duration must be 5, 10 or 15 months",
  }),
  total_price_with_interest: Joi.number().precision(2).required().messages({
    "any.required": "Total price with interest is required",
    "number.base": "Total price must be a number",
  }),
  contract_status: Joi.string()
    .valid("active", "completed", "cancelled")
    .default("active")
    .required()
    .messages({
      "any.required": "Contract status is required",
      "string.base": "Contract status must be a string",
      "any.only":
        'Contract status must be one of "active", "completed", or "cancelled"',
    }),
  interest_rate: Joi.string().valid("26%", "41%", "52%").required().messages({
    "any.required": "Interest rate is required",
    "string.base": "Interest rate must be a string",
    "any.only": 'Interest rate must be one of "26%", "41%" or "52%"',
  }),
  base_price: Joi.number().precision(2).required().messages({
    "any.required": "Base price is required",
    "number.base": "Base price must be a number",
  }),
  initial_payment: Joi.number().precision(2).required().messages({
    "any.required": "Initial payment is required",
    "number.base": "Initial payment must be a number",
  }),
  first_payment_date: Joi.date().required().messages({
    "any.required": "First payment date is required",
    "date.base": "First payment date must be a valid date",
  }),
  monthly_payment: Joi.number().precision(2).required().messages({
    "any.required": "Monthly payment is required",
    "number.base": "Monthly payment must be a number",
  }),
  amount_paid: Joi.number().precision(2).required().messages({
    "any.required": "Amount paid is required",
    "number.base": "Amount paid must be a number",
  }),
  remaining_balance: Joi.number().precision(2).required().messages({
    "any.required": "Remaining balance is required",
    "number.base": "Remaining balance must be a number",
  }),
  end_payment_date: Joi.date().required().messages({
    "any.required": "End payment date is required",
    "date.base": "End payment date must be a valid date",
  }),
});

module.exports = contractValidationSchema;
