const { User, Otp } = require("../models/index");
const generateOtp = require("../utils/generateOtp");
const bcrypt = require("bcrypt");
const _ = require("lodash");

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

    if (user.isVerified === false) {
      const { otp, expirationTime } = generateOtp();
      await Otp.create({
        otp: otp,
        expiresAt: expirationTime,
        userSlug: newUser.slug,
        otpType: "access",
      });
      return res.status(428).json({
        code: 428,
        message: "Complete account verification.....",
        data: { otp: otp },
      });
    }
    const token = await user.generateToken();
    return res.json({
      code: 201,
      message: "success",
      data: {
        ..._.pick(user, ["fullName", "number", "email"]),
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};
