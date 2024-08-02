const express = require("express");
const router = express.Router();
const business = require("../controllers/business");
const {validateBusiness} = require("../middleware/validation");

router.route("/").post(validateBusiness, business.details);

module.exports = router;