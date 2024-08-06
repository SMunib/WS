const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");

const businessHours = sequelize.define(
  "businessHours",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    openTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closeTime: {
      type: DataTypes.TIME,
      allowNull: true,
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

module.exports = businessHours;