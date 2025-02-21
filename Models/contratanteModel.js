import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import user from "../Models/userModel.js";

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

user.hasMany(Cuidadores, {foreignKey: "usuarioId", onDelete: "CASCADE"});
Contratantes.belongsTo(user, {foreignKey: "usuarioId"});

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Contratantes;