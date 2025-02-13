import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import user from "../Models/userModel.js";

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

user.hasMany(Cancelamentos, {foreignKey: "contratanteId", onDelete: "CASCADE"});
user.hasMany(Cancelamentos, {foreignKey: "cuidadorId", onDelete: "CASCADE"});
user.hasMany(Cancelamentos, {foreignKey: "agendamentoId", onDelete: "CASCADE"});
Cancelamentos.belongsTo(user, { foreignKey: "contratanteId" });
Cancelamentos.belongsTo(user, { foreignKey: "cuidadorId" });
Cancelamentos.belongsTo(user, { foreignKey: "agendamentoId"});

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Cancelamentos;