const jwt = require("jsonwebtoken");
const Token = require("../models/token");

async function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, token not provided");
  const key = process.env.jwtSecretKey;
  try {
    const decoded = jwt.verify(token, key);
    const tokenRecord = await Token.findOne({ where: { key: token } });
    if (!tokenRecord) return res.status(401).send("Invalid Token");
    req.user = decoded;
    req.user.token = token;
    next();
  } catch (ex) {
    next(ex);
  }
}

module.exports = verifyToken;