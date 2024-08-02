const { Sequelize } = require("sequelize");
const path = require("path");
const configPath = path.resolve(__dirname, "..", "config", "config.json");
const config = require(configPath).db;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

async function syncDB() {
  try {
    await sequelize.sync({ alter: false, force: false });
    console.log("All models synchronized");
  } catch (err) {
    console.log("error synchronizing models", err);
  }
}
module.exports = {
  sequelize,
  syncDB,
};
