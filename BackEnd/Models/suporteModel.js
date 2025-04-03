import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";

const Suporte = sequelize.define("Suporte", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    resposta: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pendente",
    },
    tentativas: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    tableName: "suporte",
    timestamps: true,
});

sequelize.sync()
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Suporte;
