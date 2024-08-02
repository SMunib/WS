const Joi = require("joi");

const businessSchema = Joi.object({
  businessType: Joi.string().required(),
  tags: Joi.string().optional(),
  location: Joi.string().required(),
  gpsNumber: Joi.number().optional(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  region: Joi.string().required(),
  salestax: Joi.number().optional(),
});

module.exports = {
  businessSchema,
};
