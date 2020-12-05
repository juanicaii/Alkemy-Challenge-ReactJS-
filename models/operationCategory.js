const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = model;
function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Category", attributes, options);
}
