import { DataTypes } from "sequelize";
import sequelize from "../Database/Database";
import user from "../Models/userModel.js";

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

user.hasMany(Privacidade, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Privacidade.belongsTo(user, { foreignKey: "usuarioId" });

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Privacidade;
