import { DataTypes } from "sequelize";
import sequelize  from "../Database/Database";

const Cuidadores = sequelize.define("Cuidadores", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
},
{
    tableName: "cuidadores",
    timestamps: true,
});

sequelize.sync({alter: true})
    .then(() =>{
        console.log("Tabela sincronizada")
    })
    .catch((error) => {
        console.error("Error ao sincronizar a tabela", error)
    });

export default Cuidadores;