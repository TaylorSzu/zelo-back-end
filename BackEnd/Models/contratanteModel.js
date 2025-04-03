import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import Usuario from "../Models/userModel.js"; // Certifique-se de que o modelo está correto

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
        references: {
            model: Usuario, 
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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


Usuario.hasMany(Contratantes, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Contratantes.belongsTo(Usuario, { foreignKey: "usuarioId" });

sequelize.sync({alter: true})
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Contratantes;