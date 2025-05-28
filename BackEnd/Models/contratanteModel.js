const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");
const Usuario = require("../Models/userModel"); 

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
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    observacoesMedicas: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: "contratantes",
    timestamps: true,
});

module.exports = Contratantes;