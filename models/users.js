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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync();
        let password = bcrypt.hashSync(value, salt);
        this.setDataValue("password", password);
      },
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Users", attributes, options);
}
