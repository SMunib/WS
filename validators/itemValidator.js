const Joi = require("joi");

const itemSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name should be of type text",
    "string.empty": "name should not be empty",
    "any.required": "name is a required field",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price cannot be empty",
    "any.required": "Price is a required field",
  }),
  isTaxable: Joi.boolean().required().messages({
    "boolean.base": "IsTaxable must be a boolean value",
    "boolean.empty": "IsTaxable cannot be empty",
    "any.required": "IsTaxable is a required field",
  }),
  description: Joi.optional(),
  allowSides: Joi.optional(),
  numOfSides: Joi.optional(),
});

module.exports = {
  itemSchema,
};
