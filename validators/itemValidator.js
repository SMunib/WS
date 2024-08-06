const Joi = require("joi");

const itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  isTaxable: Joi.boolean().required(),
  description: Joi.optional(),
});

module.exports = {
  itemSchema,
};
