const { Sequelize, DataTypes } = require("sequelize");
const ExchangeType = require("./exchangeType");
const sequelize = require("../db/config");

const MoneyBalance = sequelize.define(
  "Money_Balance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NO INFORMATION",
    },
    createdAt: {
      type: Sequelize.DATE,
      field: "date",
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    underscored: true,
  }
);
ExchangeType.hasOne(MoneyBalance, { foreignKey: "type_id" });
module.exports = MoneyBalance;
