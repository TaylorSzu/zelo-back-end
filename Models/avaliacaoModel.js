const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

const Avaliacao = sequelize.define("avaliações", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contratanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cuidadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estrelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: "avaliacoes",
    timestamps: true,
});


module.exports = Avaliacao;
