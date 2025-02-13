import { DataTypes } from "sequelize";
import sequelize from "../Database/Database";

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

sequelize.sync()
.then(() => {
    console.log("Tabela sincronizada");
})
.catch((error) => {
    console.error("Erro ao sincronizar a tabela", error);
});

export default Agendamento;