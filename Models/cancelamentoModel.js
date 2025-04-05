const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

const Cancelamentos = sequelize.define("Cancelamentos", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    contratanteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cuidadorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    agendamentoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dataCancelamento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "cancelado",
    }
}, {
    tableName: "cancelamentos",
    timestamps: true,
});


module.exports = Cancelamentos;