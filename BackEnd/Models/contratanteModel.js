import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import User from "../Models/userModel.js";
import Cuidador from "../Models/cuidadorModel.js";
import Agendamento from "../Models/agendamentoModel.js";

const Contratantes = sequelize.define("Contratantes", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    necessidades: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    termosAceitos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    metodoPagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "contratantes",
    timestamps: true,
});

User.hasMany(Contratantes, {foreignKey: "usuarioId", onDelete: "CASCADE"});
Agendamento.hasMany(Contratantes, {foreignKey: "contratanteId", onDelete: "CASCADE"});
Cuidador.hasMany(Contratantes, {foreignKey: "cuidadorId", onDelete: "CASCADE"});

Contratantes.belongsTo(User, {foreignKey: "usuarioId"});
Agendamento.belongsTo(Contratantes, {foreignKey: "contratanteId"});
Cuidador.belongsTo(Contratantes, {foreignKey: "cuidadorId"});

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Contratantes;