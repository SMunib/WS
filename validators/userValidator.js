const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().min(2).required().messages({
    "string.base": "name should be of type text",
    "string.empty": "name should not be empty",
    "string.min": "name should have a min length of {#limit}",
    "any.required": "fullName is a required field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email should not be empty",
    "any.required": "Email is a required field",
  }),
  number: Joi.string().min(10).required().messages({
    "number.empty": "number should not be empty",
    "number.min": "number should have a min length of {#limit}",
    "any.required": "number is a required field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is a required field",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should be of min length {#limit}",
  }),
  confirmPassword: Joi.string().min(6).required().messages({
    "any.required": "confirmPassword is a required field",
    "string.empty": "Confirm password cannot be empty",
    "string.min": "ConfirmPassword should have min length of {#limit}",
  }),
});

module.exports = {
  signupSchema,
};
