const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");
const { tokenTypes } = require("../utils/types");

const Token = sequelize.define(
  "Token",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tokenType: {
      type: DataTypes.ENUM,
      values: Object.values(tokenTypes),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    hooks: {
      beforeCreate: (token) => {
        token.slug = uuidv4();
      },
    },
  }
);

module.exports = Token;
