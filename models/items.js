const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");

const Items = sequelize.define(
  "Items",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isTaxable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    displayPicture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allowSides: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    numOfSides: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    paranoid: true,
    hooks: {
      beforeCreate: (token) => {
        token.slug = uuidv4();
      },
      beforeValidate: (item, options) => {
        if (item.allowSides && (item.numOfSides === null || item.numOfSides === undefined)) {
          throw new Error("numOfSides is required if allowSides is true");
        }
    },
  }
});

module.exports = Items;
