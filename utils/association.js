const {
  User,
  Token,
  Role,
  Otp,
  Business,
  Items,
  businessHours,
  menuItems,
  Sides,
  Orders
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

  Items.belongsToMany(Sides, {
    through: menuItems,
    foreignKey: "itemSlug",
    sourceKey: "slug",
    otherKey: "sideSlug",
    as: "sides",
  });
  Sides.belongsToMany(Items, {
    through: menuItems,
    foreignKey: "sideSlug",
    sourceKey: "slug",
    otherKey: "itemSlug",
    as: "items",
  });

  Orders.belongsTo(User, {foreignKey:{name: 'userSlug',allowNull: false},targetKey:'slug',onDelete:"CASCADE"});
  User.hasMany(Orders, {foreignKey:'userSlug',sourceKey:'slug',onDelete:'CASCADE'});
  
  
};

module.exports = defineAssociations;
