const express = require("express");
const { validateSignup,validatePassword } = require("../middleware/validation");
const register = require("../controllers/register");
const router = express.Router();
const verifyToken = require("../middleware/authentication");

router.route("/forgetPass").post(register.forgetPassword);
router.route("/resetPass").post(validatePassword,verifyToken,register.resetPassword);
router.route("/:role").post(validateSignup, register.signup);

module.exports = router;
