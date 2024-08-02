const Joi = require("joi");

const passwordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});

module.exports = {
  passwordSchema,
};
