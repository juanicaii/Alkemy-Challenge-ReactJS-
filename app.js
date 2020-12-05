var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const sequelize = require("./db/config");
sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   MODELS
require("./models/exchangeType");
require("./models/moneyBalance");

// Tables
//creaciones de las tablas
sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("database created");
});

// RUTAS
var balance = require("./routes/balance");
var moneyIncome = require("./routes/moneyIncomeRoute");
var moneyOutflow = require("./routes/moneyOutflowRoute");

// APP
var app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/balance", balance);
app.use("/api/moneyincome", moneyIncome);
app.use("/api/moneyoutflow", moneyIncome);

module.exports = app;
