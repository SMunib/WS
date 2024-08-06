const {
  User,
  Token,
  Role,
  Otp,
  Business,
  Items,
  businessHours,
} = require("../models/index");

const defineAssociations = async () => {
  User.belongsTo(Role, {
    foreignKey: "role",
    sourceKey: "role",
    onDelete: "CASCADE",
  });
  Role.hasMany(User, {
    foreignKey: "role",
    sourceKey: "role",
    onDelete: "CASCADE",
  });

  User.hasMany(Token, {
    foreignKey: "userSlug",
    sourceKey: "slug",
    onDelete: "CASCADE",
  });
  Token.belongsTo(User, { foreignKey: "userSlug", sourceKey: "slug" });

  User.hasMany(Otp, {
    foreignKey: "userSlug",
    sourceKey: "slug",
    as: "otps",
    onDelete: "CASCADE",
  });
  Otp.belongsTo(User, { foreignKey: "userSlug", sourceKey: "slug" });

  User.hasOne(Business, {
    foreignKey: "userSlug",
    sourceKey: "slug",
    onDelete: "CASCADE",
  });
  Business.belongsTo(User, { foreignKey: "userSlug", sourceKey: "slug" });

  Business.hasMany(Items, {
    foreignKey: "businessSlug",
    sourceKey: "slug",
    onDelete: "CASCADE",
  });
  Items.belongsTo(Business, { foreignKey: "businessSlug", sourceKey: "slug" });

  Business.hasMany(businessHours, {
    foreignKey: "businessSlug",
    sourceKey: "slug",
    onDelete: "CASCADE",
  });
  businessHours.belongsTo(Business, {
    foreignKey: "businessSlug",
    sourceKey: "slug",
  });
};

module.exports = defineAssociations;
