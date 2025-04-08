const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const Usuario = require("../Models/userModel"); // Certifique-se de que o modelo está correto

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

module.exports = Contratantes;