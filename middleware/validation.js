const { signupSchema } = require("../validators/userValidator");
const { passwordSchema } = require("../validators/password");
const { loginSchema } = require("../validators/loginValidator");
const { businessSchema } = require("../validators/businessValidator");
const { itemSchema } = require("../validators/itemValidator");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body); // Validating request body against schema
      next(); // Proceed to the next middleware/controller if validation passes
    } catch (err) {
      next(err); // Pass the error to the error-handling middleware
    }
  };
};

module.exports = {
  validateSignup: validate(signupSchema),
  validatePassword: validate(passwordSchema),
  validateLogin: validate(loginSchema),
  validateBusiness: validate(businessSchema),
  validateItem: validate(itemSchema),
};
