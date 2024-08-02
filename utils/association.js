const { User, Token, Role, Otp, Business } = require("../models/index");

const defineAssociations = async () => {
  User.belongsTo(Role, { foreignKey: "role", sourceKey: "role", onDelete: 'CASCADE' });
  Role.hasMany(User, { foreignKey: "role", sourceKey: "role" });

  User.hasMany(Token, { foreignKey: "userSlug", sourceKey: "slug" , onDelete: 'CASCADE'},);
  Token.belongsTo(User, { foreignKey: "userSlug", sourceKey: "slug" });

  User.hasMany(Otp, { foreignKey: "userSlug", sourceKey: "slug", as: "otps" , onDelete: 'CASCADE'});
  Otp.belongsTo(User, { foreignKey: "userSlug", sourceKey: "slug" });

  User.hasOne(Business, {foreignKey: "userSlug", sourceKey: "slug",onDelete:"CASCADE"});
  Business.belongsTo(User, {foreignKey: "userSlug", sourceKey: "slug"});
};

module.exports = defineAssociations;
