import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";

const Privacidade = sequelize.define("Privacidade", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dadosEssenciaisCompartilhados: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    aceitouMarketing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    aceitouTermos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: "privacidade",
    timestamps: true,
});

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Privacidade;
