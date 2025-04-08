const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

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


module.exports = Privacidade;
