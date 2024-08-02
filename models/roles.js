const { DataTypes } = require("sequelize");
const { sequelize } = require("../startup/db");
const { v4: uuidv4 } = require("uuid");
const { userTypes } = require("../utils/types");

const Role = sequelize.define(
  "Role",
  {
    slug: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(userTypes),
      allowNull: false,
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

module.exports = Role;
