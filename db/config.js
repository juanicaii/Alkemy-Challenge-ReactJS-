const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const functions = require("../utils/functions");
module.exports = db = {};
initialize();

async function initialize() {
  // MYSQL CREATE DATBABASE
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
  );
  // SEQUELIZE CONNECTION
  const sequelize = new Sequelize(
    "alkemychallenge",
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  );

  //   MODELS
  db.sequelize = sequelize;
  db.exchangeType = require("../models/exchangeType")(sequelize);
  db.moneyBalance = require("../models/moneyBalance")(sequelize);
  db.operationCategory = require("../models/operationCategory")(sequelize);
  db.users = require("../models/users")(sequelize);
  // ASSOCIATIONS
  db.moneyBalance.belongsTo(db.exchangeType, {
    foreignKey: "type_id",
    as: "type",
  });
  db.moneyBalance.belongsTo(db.operationCategory, {
    foreignKey: "category_id",
    as: "category",
  });
  db.users.hasMany(db.moneyBalance, { foreignKey: "user_id", as: "user" });

  await sequelize.sync();

  // TYPES
  functions.createIfNotExist(
    db.exchangeType,
    { name: "Money Income" },
    { name: "Money Income" }
  );
  functions.createIfNotExist(
    db.exchangeType,
    { name: "Money Outflow" },
    { name: "Money Outflow" }
  );
}
