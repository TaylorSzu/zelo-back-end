const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const user = require("../Models/userModel");

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
    },
    cuidadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agendamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    taxa: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.15,
    },
    dataPagamento: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    metodoPagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendente",
    },
    mercadoPagoId: {
      type: DataTypes.STRING,
      unique: true,
    },
    mercadoPagoStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "pagamentos",
    timestamps: true,
  }
);

module.exports = Pagamento;
