const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");

const Business = sequelize.define(
  "Business",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesTax: {
      type: DataTypes.FLOAT,
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

module.exports = Business;
