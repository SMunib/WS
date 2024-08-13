const { Search, Business } = require("../models/index");
const { Op } = require("sequelize");

exports.search = async (req, res, next) => {
  const searchTerm = req.body.search;
  const words = searchTerm.split(" ");

  try {
    const results = await Business.findAll({
      include: [
        {
          model: Items,
          where: {
            [Op.or]: [
              ...words.map((word) => ({
                name: {
                  [Op.like]: `%${word}%`,
                },
              })),
              ...words.map((word) => ({
                description: {
                  [Op.like]: `%${word}%`,
                },
              })),
            ],
          },
          attributes: ["name", "price"],
        },
      ],
      attributes: ["name"],
    });

    if (!results.length) {
      return res.json({
        code: 400,
        message: "Could not find any relevant results",
        data: {},
      });
    }

    const [searchEntry, created] = await Search.findOrCreate({
      where: {
        searchTerm: searchTerm,
        userSlug: req.user.slug,
      },
      defaults: {
        searchTerm: searchTerm,
        searchDate: Date.now(),
        userSlug: req.user.slug,
        popularity: 1,
      },
    });

    if (!created) {
      searchEntry.popularity += 1;
      await searchEntry.save();
    }

    return res.json({ code: 200, message: "success", data: results });
  } catch (err) {
    next(err);
  }
};

exports.history = async (req, res, next) => {
  try {
    const id = req.user.slug;
    const history = await Search.findAll({
      where: { userSlug: id },
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["searchTerm", "createdAt"],
    });
    if (!history)
      return res.json({
        code: 404,
        message: "Search history is empty",
        data: {},
      });
    return res.json({ code: 200, message: "Success", data: history });
  } catch (err) {
    next(err);
  }
};

exports.popularSearch = async (req, res, next) => {
  try {
    const topSearch = await Search.findAll({
      attributes: ["searchTerm"],
      order: [["popularity", "DESC"]],
      limit: 10,
    });
    if (!topSearch)
      return res.json({
        code: 400,
        message: "Error fetching search results",
        data: {},
      });
    return res.json({ code: 200, message: "success", data: topSearch });
  } catch (err) {
    next(err);
  }
};
