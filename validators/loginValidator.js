const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email should not be empty",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is a required field",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should be of min length {#limit}",
  }),
});

module.exports = {
  loginSchema,
};
