const Joi = require("joi");

const businessSchema = Joi.object({
  businessType: Joi.string().required().messages({
    "string.base": "Business type must be a string",
    "string.empty": "Business type cannot be empty",
    "any.required": "Business type is a required field",
  }),

  tags: Joi.array().items(Joi.string().optional()).messages({
    "array.base": "Tags must be an array",
    "string.base": "Each tag must be a string",
  }),

  location: Joi.string().required().messages({
    "string.base": "Location must be a string",
    "string.empty": "Location cannot be empty",
    "any.required": "Location is a required field",
  }),

  gpsNumber: Joi.number().optional().messages({
    "number.base": "GPS number must be a number",
  }),

  city: Joi.string().required().messages({
    "string.base": "City must be a string",
    "string.empty": "City cannot be empty",
    "any.required": "City is a required field",
  }),

  district: Joi.string().required().messages({
    "string.base": "District must be a string",
    "string.empty": "District cannot be empty",
    "any.required": "District is a required field",
  }),

  region: Joi.string().required().messages({
    "string.base": "Region must be a string",
    "string.empty": "Region cannot be empty",
    "any.required": "Region is a required field",
  }),

  salesTax: Joi.number().optional().messages({
    "number.base": "Sales tax must be a number",
  }),

  rating: Joi.number().optional(),
  description: Joi.string().optional(),
});

module.exports = {
  businessSchema,
};
