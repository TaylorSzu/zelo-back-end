const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const Contratantes = require("../Models/contratanteModel");

const Agendamento = sequelize.define("Agendamento", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contratanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Contratantes,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    cuidadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cuidadores",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    dataHoraInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataHoraFim: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfterField(value) {
                if (value <= this.dataHoraInicio) {
                    throw new Error("A data de término deve ser depois da data de início.");
                }
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendente",
    },
}, {
    tableName: "agendamentos",
    timestamps: true,
});


module.exports = Agendamento;
