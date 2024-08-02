const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const { validateLogin } = require("../middleware/validation");

router.route("/").post(validateLogin, login.login);

module.exports = router;
