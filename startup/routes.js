const express = require("express");
const register = require("../routes/register");
const login = require("../routes/login");
const verifyOtp = require("../routes/verifyOtp");
const business = require("../routes/business");

module.exports = async function (app) {
  app.use(express.json());
  app.use("/api/verifyOtp", verifyOtp);
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/api/business",business);
};
