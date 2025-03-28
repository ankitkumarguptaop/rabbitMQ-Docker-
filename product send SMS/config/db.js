const { Sequelize } = require("sequelize");

const config = require("./config")["development"];

const sequelize = new Sequelize(config);
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, dbConnection };
