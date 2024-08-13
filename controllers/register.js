const { User, Otp, Token, Role } = require("../models/index");
const bcrypt = require("bcrypt");
const generateOtp = require("../utils/generateOtp");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../startup/db");

exports.signup = async (req, res, next) => {
  try {
    const { fullName, email, number, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ code: 400, message: "Email already in use", data: {} });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ code: 400, message: "Password does not match", data: {} });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, expirationTime } = generateOtp();
    const role = await Role.findOne({ where: { role: req.params.role } });
    if (!role) {
      return res
        .status(400)
        .json({ code: 404, message: "Invalid role", data: {} });
    }
    const newUser = await User.create({
      fullName,
      email,
      number,
      password: hashedPassword,
      role: role.role,
    });
    const newOtp = await Otp.create({
      otp: otp,
      expiresAt: expirationTime,
      userSlug: newUser.slug,
      otpType: "access",
    });
    return res.status(201).json({ code: 201, message: "success", data: {} });
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      return res
        .status(400)
        .json({ code: 400, message: "user not found", data: {} });
    const { otp, expirationTime } = generateOtp();
    await Otp.destroy({ where: { userSlug: slug } });
    await Otp.create({
      otp: otp,
      expiresAt: expirationTime,
      userSlug: user.slug,
      otpType: "reset",
    });
    return res.json({ code: 200, message: "success", data: {} });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const slug = req.user.slug;
  const token = req.user.token;
  const { password, confirmPassword } = req.body;
  const user = await User.findByPk(slug);
  if (!user)
    return res
      .status(400)
      .json({ code: 400, message: "user not found", data: {} });
  const checkToken = await Token.findOne({
    where: {
      userSlug: slug,
      key: token,
    },
  });
  if (!checkToken)
    return res
      .status(400)
      .json({ code: 400, message: "Invalid Link", data: {} });
  const secret = process.env.jwtSecretKey;
  try {
    const payload = jwt.verify(token, secret);
    if (!payload)
      return res
        .status(400)
        .json({ code: 400, message: "JWT Verification failed", data: {} });

    if (password !== confirmPassword) {
      return res.json({
        code: 400,
        message: "Passowrds do not match",
        data: {},
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const updatedUser = user.update({ password: hashedpassword });
    if (!updatedUser)
      return res.json({ code: 400, message: "User updation failed", data: {} });
    await Token.destroy({
      where: {
        userSlug: slug,
      },
    });
    return res.status(200).json({
      code: 200,
      message: "success",
      data: _.pick(updatedUser, ["fullName", "email", "number"]),
    });
  } catch (err) {
    next(err);
  }
};
