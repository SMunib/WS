const { User, Otp, Token } = require("../models/index");
const generateOtp = require("../utils/generateOtp");
const { Sequelize } = require("sequelize");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

exports.verify = async (req, res, next) => {
  const { otp, number } = req.body;
  try {
    const userWithLatestOtp = await User.findOne({
      where: { number: number },
      include: [
        {
          model: Otp,
          as:"otps",
          required: false,
          // where: { userSlug: Sequelize.col("User.slug") },
          separate: true,
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
    });
    if (!userWithLatestOtp) {
      return res
        .status(400)
        .json({ code: 400, message: "User not found", data: {} });
    }
    // console.log(userWithLatestOtp.otps[0]);
    const latestOtp = userWithLatestOtp.otps[0];
    // console.log(latestOtp);
    
    if (!latestOtp) {
      return res
        .status(400)
        .json({ code: 400, message: "No OTP found for user", data: {} });
    }
    if (new Date() > new Date(otp.expiresAt)) {
      return res
        .status(400)
        .json({ message: "OTP expired or invalid. Ask for a new otp" });
    }
    if (otp === latestOtp.otp) {
      const updated = await userWithLatestOtp.update({ isVerified: true });
      if (!updated)
        return res
          .status(400)
          .json({ code: 400, message: "Account creation failed", data: {} });
      if (latestOtp.otpType === "reset") {
        const secret = process.env.jwtSecretKey;
        const payload = {
          number: userWithLatestOtp.number,
          slug: userWithLatestOtp.slug,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        await Token.destroy({
          where: {
            userSlug: userWithLatestOtp.slug,
          },
        });
        await Token.create({
          key: token,
          userSlug: userWithLatestOtp.slug,
          tokenType: "reset",
        });
        await Otp.destroy({
          where: { otp: otp },
        });
        return res.json({
          code: 200,
          message: "success",
          data: { token: token },
        });
      }
      await Otp.destroy({
        where: { otp: otp },
      });
      return res.status(200).json({
        message: "success",
        code: 200,
        data: _.pick(userWithLatestOtp, ["fullName", "email"]),
      });
    } else {
      return res
        .status(400)
        .json({ code: 400, message: "Error validating OTP", data: {} });
    }
  } catch (error) {
    next(error);
  }
};

exports.resend = async (req, res, next) => {
  const { number, type } = req.body;
  try {
    const { otp, expirationTime } = generateOtp();
    const user = await User.findOne({ where: { number: number } });
    const MAX_OTP_REQUESTS = 3;
    const TIME_FRAME_MS = 60 * 60 * 1000;
    const oneHourAgo = new Date(Date.now() - TIME_FRAME_MS);

    const otpCount = await Otp.count({
      where: {
        userSlug: user.slug,
        createdAt: {
          [Sequelize.Op.gt]: oneHourAgo,
        },
      },
    });

    if (otpCount >= MAX_OTP_REQUESTS) {
      return res.status(429).json({
        code: 429,
        message: "Too many OTP requests. Try again later.",
        data: {},
      });
    }
    await Otp.create({
      otp,
      expiresAt: expirationTime,
      userSlug: user.slug,
      otpType: type,
    });
    return res
      .status(200)
      .json({ message: "Otp sent", data: { otp: otp }, code: 200 });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
