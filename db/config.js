const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("alkemychallenge", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
