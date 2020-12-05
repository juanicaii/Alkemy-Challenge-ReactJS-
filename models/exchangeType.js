const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db/config");

const ExchangeType = sequelize.define(
  "Exchange_Type",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ExchangeType;
