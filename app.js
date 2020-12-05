var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
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
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", balance);
app.use("/api/category", category);
app.use("/api/users", users);

module.exports = app;
