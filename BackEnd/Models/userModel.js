import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js"


const Usuario = sequelize.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type : DataTypes.STRING,
            allowNull: false,
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoUsuario: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ativo",
        }
    },
    {
        tableName: "usuarios",
        timestamps: true,
    }
);

sequelize.sync({alter : true})
    .catch((error) => {
        console.error("Error ao sincronizar a tabela", error)
    });

export default Usuario;
