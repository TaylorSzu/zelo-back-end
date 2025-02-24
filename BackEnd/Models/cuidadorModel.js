    import { DataTypes } from "sequelize";
    import sequelize  from "../Database/Database.js";
    import user from "../Models/userModel.js";

    const Cuidadores = sequelize.define("Cuidadores", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disponibilidade: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        valorHora: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        valorPeriodo: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        especialidade: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        statusVerificacao: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pendente"
        }
    },
    {
        tableName: "cuidadores",
        timestamps: true,
    });

    user.hasMany(Cuidadores, {foreignKey: "usuarioId", onDelete: "CASCADE"});
    Cuidadores.belongsTo(user, {foreignKey: "usuarioId"});

sequelize.sync()
    .then(() =>{
        console.log("Tabela sincronizada")
    })
    .catch((error) => {
        console.error("Error ao sincronizar a tabela", error)
    });

export default Cuidadores;