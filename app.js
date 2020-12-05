var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

// CONFIG DATABASE
const sequelize = require("./db/config");

// ROUTES
var balance = require("./routes/balance");
var users = require("./routes/users");
var category = require("./routes/category");

// APP
var app = express();

// MIDDLEWARE
app.use(express.static("./public/build/"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/build/index.html");
});

app.use("/api", balance);
app.use("/api/category", category);
app.use("/api/users", users);

module.exports = app;
