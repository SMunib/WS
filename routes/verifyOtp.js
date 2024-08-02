const express = require("express");
const router = express.Router();
const verifyOtp = require("../controllers/verifyOtp");

router.route("/resend").post(verifyOtp.resend);
router.route("/").post(verifyOtp.verify);

module.exports = router;
