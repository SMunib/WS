const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");

const menuItems = sequelize.define(
  "menuItems",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
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

module.exports = menuItems;
