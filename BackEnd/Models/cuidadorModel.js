    import { DataTypes } from "sequelize";
    import sequelize  from "../Database/Database.js";
    import User from "../Models/userModel.js";
    import Agendamento from "../Models/agendamentoModel.js";
    import Contratantes from "../Models/contratanteModel.js";

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

    User.hasMany(Cuidadores, {foreignKey: "usuarioId", onDelete: "CASCADE"});
    Cuidadores.hasMany(Contratantes, {foreignKey: "cuidadorId", onDelete: "CASCADE"});
    Cuidadores.hasMany(Agendamento, {foreignKey: "cuidadorId", onDelete: "CASCADE"});
    
    Cuidadores.belongsTo(User, {foreignKey: "usuarioId"});
    Agendamento.belongsTo(Cuidadores, {foreignKey: "cuidadorId"});
    Contratantes.belongsTo(Cuidadores, {foreignKey: "cuidadorId"});

sequelize.sync()
    .then(() =>{
        console.log("Tabela sincronizada")
    })
    .catch((error) => {
        console.error("Error ao sincronizar a tabela", error)
    });

export default Cuidadores;