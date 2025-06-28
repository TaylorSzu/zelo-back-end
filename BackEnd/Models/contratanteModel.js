const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const Usuario = require("../Models/userModel"); // Certifique-se de que o modelo está correto

const Contratantes = sequelize.define(
  "Contratantes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Usuario,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    idade: {
      type: DataTypes.INTEGER,
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
    tableName: "contratantes",
    timestamps: true,
  }
);

module.exports = Contratantes;
