const express = require("express");
const router = express.Router();
const business = require("../controllers/business");
const { validateBusiness, validateItem } = require("../middleware/validation");

router.route("/displaySides").get(business.showSides);
router.route("/add/:id").post(validateItem, business.addProduct);
router.route("/day/:id").post(business.day);
router.route("/deselect/:id").post(business.deselect);
router.route("/time/:id").post(business.timeOne);
router.route("/alltimes/:id").post(business.timeAll);
router.route("/createSide").post(business.createSide);
router.route("/:id").get(business.displayMenu);
router.route("/:id").post(validateBusiness, business.details);

module.exports = router;
