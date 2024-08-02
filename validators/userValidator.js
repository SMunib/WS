const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  number: Joi.string().min(10).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});

module.exports = {
  signupSchema,
};
