const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const Contratante = require("./contratanteModel");

const Idosos = sequelize.define(
  "Idosos",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    contratanteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    observacoesMedicas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "idosos",
    timestamps: true,
  }
);

module.exports = Idosos;
