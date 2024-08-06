const express = require("express");
const router = express.Router();
const business = require("../controllers/business");
const { validateBusiness, validateItem } = require("../middleware/validation");

router.route("/:id").post(validateBusiness, business.details);
router.route("/add/:id").post(validateItem, business.addProduct);
router.route("/:id").get(business.displayMenu);
router.route("/day/:id").post(business.day);
router.route("/time/:id").post(business.timeOne);
router.route("/alltimes/:id").post(business.timeAll);
module.exports = router;
