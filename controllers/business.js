const {
  User,
  Business,
  Items,
  businessHours,
  Sides,
  menuItems,
} = require("../models/index");
const getPath = require("../utils/filehandler");
const _ = require("lodash");

exports.details = async (req, res, next) => {
  try {
    const displayPicture = req.files[0];
    const data = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user)
      return res
        .status(404)
        .json({ code: 404, message: "resturant not found", data: {} });

    const path = getPath(displayPicture);
    const business = await Business.create({
      businessType: data.businessType,
      tags: data.tags.join(","),
      location: data.location,
      gpsNumber: data.gpsNumber,
      city: data.city,
      district: data.district,
      region: data.region,
      salesTax: data.salesTax,
      userSlug: userId,
      displayPicture: path,
    });
    if (!business)
      return res.status(400).json({
        code: 400,
        message: "Business could not be created",
        data: {},
      });
    return res.status(201).json({ code: 201, message: "success", data: {} });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const data = req.body;
  const displayPicture = req.files[0];
  const business = req.params.id;
  try {
    const path = getPath(displayPicture);
    // console.log(data);
    const product = await Items.create({
      name: data.name,
      price: data.price,
      isTaxable: data.isTaxable,
      description: data.description,
      displayPicture: path,
      businessSlug: business,
      allowSides: data.allowSides,
      numOfSides: data.numOfSides,
    });

    if (!product)
      return res.status(400).json({
        code: 400,
        message: "Item could not be added to the menu",
        data: {},
      });

    return res.status(200).json({
      code: 200,
      message: "success",
      data: _.pick(product, ["name", "price"]),
    });
  } catch (err) {
    next(err);
  }
};

exports.displayMenu = async (req, res, next) => {
  const business = req.params.id;
  try {
    const menu = await Items.findAll({
      where: {
        businessSlug: business,
      },
    });
    if (!menu)
      return res
        .status(404)
        .json({ code: 404, message: "No items on the menu", data: {} });
    const menuData = menu.map((item) =>
      _.pick(item, ["name", "price", "displayPicture"])
    );

    return res.status(200).json({
      code: 200,
      message: "success",
      data: menuData,
    });
  } catch (err) {
    next(err);
  }
};

exports.day = async (req, res, next) => {
  const data = req.body;
  const business = req.params.id;
  try {
    const check = await businessHours.findOne({
      where: { day: data.day, businessSlug: business },
    });
    if (check)
      return res.json({ code: 400, message: "Day already selected", data: {} });
    const day = await businessHours.create({
      day: data.day,
      businessSlug: business,
    });
    if (!day)
      return res.json({ code: 400, message: "Day selection failed", data: {} });
    return res.json({
      code: 200,
      message: "success",
      data: _.pick(day, ["day"]),
    });
  } catch (err) {
    next(err);
  }
};

exports.deselect = async (req, res, next) => {
  const business = req.params.id;
  const data = req.body;
  try {
    await businessHours.destroy({
      where: { day: data.day, businessSlug: business },
    });
    return res.json({ code: 200, message: "removed work day", data: {} });
  } catch (err) {
    next(err);
  }
};

exports.timeOne = async (req, res, next) => {
  const data = req.body;
  const business = req.params.id;
  try {
    const timing = await businessHours.findOne({
      where: { day: data.day, businessSlug: business },
    });
    if (!timing)
      return res.json({ code: 404, message: "Day not found", data: {} });
    timing.openTime = data.openTime;
    timing.closeTime = data.closeTime;
    await timing.save();
    return res.json({ code: 200, message: "Time set successfully", data: {} });
  } catch (err) {
    next(err);
  }
};

exports.timeAll = async (req, res, next) => {
  const data = req.body;
  const business = req.params.id;
  try {
    const timing = await businessHours.update(
      {
        openTime: data.openTime,
        closeTime: data.closeTime,
      },
      {
        where: {
          businessSlug: business,
        },
      }
    );
    return res.json({
      code: 200,
      message: "timings set successfully",
      data: timing,
    });
  } catch (err) {
    next(err);
  }
};

exports.showSides = async (req, res, next) => {
  try {
    const sides = await Sides.findAll({raw:true,attributes:['name','price']});
    if (!sides)
      return res.json({
        code: 404,
        message: "Error retrieving sides",
        data: {},
      });
      // console.log(sides);
    return res.json({
      code: 200,
      message: "Sides successfully retrieved",
      data: sides
    });
  } catch (err) {
    next(err);
  }
};

exports.createSide = async (req, res, next) => {
  const data = req.body;
  try {
    const side = await Sides.create({
      name: data.name,
      type: data.type,
      price: data.price,
    });
    if (!side)
      return res.json({
        code: 400,
        message: "side creation failed",
        data: {},
      });
    const menuItem = await menuItems.create({
      itemSlug: data.itemSlug,
      sideSlug: side.slug,
    });
    if (!menuItem)
      return res.json({
        code: 400,
        message: "Failed to add side to item",
        data: {},
      });
    return res.json({
      code: 200,
      message: "side added",
      data: _.pick(side,["name","price"]),
    });
  } catch (err) {
    next(err);
  }
};
