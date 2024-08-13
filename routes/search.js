const express = require("express");
const router = express.Router();
const verify = require("../middleware/authentication");
const search = require("../controllers/search");


router.route("/").post(verify, search.search);
router.route("/histroy").get(verify,search.history);
router.route("/popularSearch").get(verify,search.popularSearch);

module.exports = router;
