const { User } = require("../models/index");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user)
      return res
        .status(404)
        .json({ code: 404, message: "user does not exist", data: {} });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ code: 400, message: "Invalid Password", data: {} });

    if (user.isVerified === false)
      return res
        .status(400)
        .json({
          code: 400,
          message: "Complete account verification.....",
          data: {},
        });
    const token = await user.generateToken();
    return res.header("x-auth-token",token).json({code:201,message:"success",data: user});
  } catch (err) {
    next(err);
  }
};
