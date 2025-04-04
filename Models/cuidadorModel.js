const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const User = require("../Models/userModel");
const Agendamento = require("../Models/agendamentoModel");
const Contratantes = require("../Models/contratanteModel");

const Cuidadores = sequelize.define("Cuidadores", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    disponibilidade: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    valorHora: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    valorPeriodo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    especialidade: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    statusVerificacao: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendente"
    }
}, {
    tableName: "cuidadores",
    timestamps: true,
});

// Relacionamentos
User.hasMany(Cuidadores, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Cuidadores.hasMany(Contratantes, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
Cuidadores.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE" });

Cuidadores.belongsTo(User, { foreignKey: "usuarioId" });
Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });
Contratantes.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });

sequelize.sync()
    .then(() => {
        console.log("Tabela sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela", error);
    });

module.exports = Cuidadores;
