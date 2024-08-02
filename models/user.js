const { sequelize } = require("../startup/db");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const Token = require("./token");
const { v4: uuidv4 } = require("uuid");
const { tokenTypes } = require("../utils/types");

const User = sequelize.define(
  "User",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: (token) => {
        token.slug = uuidv4();
      },
    },
  }
);

User.prototype.generateToken = async function () {
  await Token.destroy({ where: { userSlug: this.slug } });
  const jwtkey = process.env.jwtSecretKey;
  const token = jwt.sign({ slug: this.slug }, jwtkey, {
    expiresIn: "1h",
  });
  await Token.create({
    key: token,
    tokenType: tokenTypes.ACCESS,
    userSlug: this.slug,
  });
  return token;
};

module.exports = User;
