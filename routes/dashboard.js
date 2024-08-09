const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const verify = require("../middleware/authentication");

router.route("/").get(verify, dashboard.display);
router.route("/menu").get(verify, dashboard.menu);
router.route("/itemSelect").get(verify, dashboard.itemSelect);
router.route("/search").post(verify, dashboard.search);

module.exports = router;
