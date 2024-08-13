const { Items, User, Business, Sides, menuItems } = require("../models/index");

exports.display = async (req, res, next) => {
  try {
    const resturants = await User.findAll({
      where: { role: "resturant" },
      attributes: ["fullName"],
      include: [
        {
          model: Business,
          attributes: ["rating", "displayPicture"],
        },
      ],
    });
    if (!resturants)
      return res.json({
        code: 404,
        message: "Error fetching resturants",
        data: {},
      });
    // console.log(resturants);
    return res.json({
      code: 200,
      message: "success",
      data: resturants,
    });
  } catch (err) {
    next(err);
  }
};

exports.menu = async (req, res, next) => {
  try {
    const menu = await User.findAll({
      attributes: ["name"],
      include: [
        {
          model: Business,
          attributes: ["description"],
          include: [
            {
              model: Items,
              attributes: ["name", "price", "displayPicture"],
            },
          ],
        },
      ],
    });
    if (!menu)
      return res.json({
        code: 200,
        message: "error retrieving menu",
        data: {},
      });
    console.log("menu");
    return res.json({ code: 200, message: "success", data: menu });
  } catch (err) {
    next(err);
  }
};

exports.itemSelect = async (req, res, next) => {
  const itemSlug = req.body.id;
  try {
    const item = await Items.findOne({
      where: { slug: itemSlug },
      attributes: ["name", "description", "price"],
      include: [
        {
          model: Sides,
          through: { model: menuItems, attributes: [] },
          attributes: ["name", "type"],
        },
      ],
    });
    if (!item)
      return res.json({
        code: 404,
        message: "Error fetching item details",
        data: {},
      });
    console.log("item");
    return res.json({ code: 200, message: "success", data: item });
  } catch (err) {
    next(err);
  }
};
