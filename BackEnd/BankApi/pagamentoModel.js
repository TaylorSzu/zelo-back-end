const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const user = require("../Models/userModel");
const contratante = require("../Models/contratanteModel.js");
const cuidador = require("../Models/cuidadorModel.js");
const agendamentos = require("../Models/agendamentoModel.js");

const Pagamento = sequelize.define(
  "Pagamento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contratanteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: contratante,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cuidadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: cuidador,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    agendamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: agendamentos,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    cuidador_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contratante_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valorHora: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currencyType: {
      type: DataTypes.STRING,
      defaultValue: "BRL",
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pendente",
    },
    banco: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Mercado Pago",
    },
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataGeral: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metodo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "PIX"
    },
    linkPagCT: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkPagCD: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "pagamentos",
    timestamps: true,
  }
);

module.exports = Pagamento;
