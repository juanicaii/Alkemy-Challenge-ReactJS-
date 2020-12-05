const { Sequelize, DataTypes } = require("sequelize");
module.exports = model;
function model(sequelize) {
  const attributes = {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  };
  const options = {
    createdAt: true,
    updatedAt: false,
    underscored: true,
  };

  return sequelize.define("Money_balance", attributes, options);
}
