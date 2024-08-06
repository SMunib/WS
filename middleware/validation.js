const { signupSchema } = require("../validators/userValidator");
const { passwordSchema } = require("../validators/password");
const { loginSchema } = require("../validators/loginValidator");
const { businessSchema } = require("../validators/businessValidator");
const { itemSchema } = require("../validators/itemValidator");

const validate = (schema) => async (req, res, next) => {
  // console.log(req.body);
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateSignup: validate(signupSchema),
  validatePassword: validate(passwordSchema),
  validateLogin: validate(loginSchema),
  validateBusiness: validate(businessSchema),
  validateItem: validate(itemSchema),
};
