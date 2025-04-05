const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

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



module.exports = Suporte;
