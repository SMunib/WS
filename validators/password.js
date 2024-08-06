const Joi = require("joi");

const passwordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required':'Password is a required field',
    'string.empty': 'Password cannot be empty'
  }),
  confirmPassword: Joi.string().min(6).required().messages({
    'any.required':'confirmPassword is a required field',
    'string.empty':'Confirm password cannot be empty'
  }),
});

module.exports = {
  passwordSchema,
};
