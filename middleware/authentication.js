const jwt = require("jsonwebtoken");
const key = process.env.jwtSecretKey;
const Token = require("../models/token");

async function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, token not provided");
  try {
    const decoded = jwt.verify(token, key);
    const tokenRecord = await Token.findOne({ where: { key: token } });
    if (!tokenRecord) return res.status(401).send("Invalid Token");
    req.user = decoded;
    next();
  } catch (ex) {
    next(err);
  }
}

module.exports = verifyToken;