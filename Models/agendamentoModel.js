import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import user from "../Models/userModel.js";

const Agendamento = sequelize.define("Agendamento",
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
        dataHoraInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dataHoraFim: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pendente",
        },
    },
    {
        tableName: "agendamentos",
        timestamps: true,
    }
);

user.hasMany(Agendamento, { foreignKey: "contratanteId", onDelete: "CASCADE" });
user.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
Agendamento.belongsTo(user, { foreignKey: "contratanteId" });
Agendamento.belongsTo(user, { foreignKey: "cuidadorId" });

sequelize.sync()
.then(() => {
    console.log("Tabela sincronizada");
})
.catch((error) => {
    console.error("Erro ao sincronizar a tabela", error);
});

export default Agendamento;