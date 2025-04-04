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
            model: "cuidadores", // Nome da tabela como string
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

// Importar dinamicamente os Cuidadores
(async () => {
    const Cuidadores = require("../Models/cuidadorModel");

    Contratantes.hasMany(Agendamento, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Cuidadores.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });

    Agendamento.belongsTo(Contratantes, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });
})();

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Tabela de agendamentos sincronizada.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela de agendamentos", error);
    });

module.exports = Agendamento;
