const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

module.exports = {
  loginSchema,
};
