const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");

const Orders = sequelize.define(
  "Orders",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (token) => {
        token.slug = uuidv4();
      },
    },
  }
);

module.exports = Orders;