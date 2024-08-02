const { sequelize, syncDB } = require("./db");
const defineAssociations = require("../utils/association");
const setupRoutes = require("../startup/routes");
const errorHandler = require("../middleware/errorHandler");
const Role = require("../models/roles");

async function initializeDB(app) {
  await defineAssociations();
  await syncDB();

  const roles = ["user", "admin", "resturant"];
  for (const role of roles) {
    await Role.findOrCreate({ where: { role: role } });
  }
  console.log("Roles seeded successfully.");

  await setupRoutes(app);
  app.use(errorHandler);
}

module.exports = { initializeDB };
