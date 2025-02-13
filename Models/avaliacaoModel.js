import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import user from "../Models/userModel.js";

const Avaliacao = sequelize.define("avaliações",
    {
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
            allowNull: true
        }
    },
    {
        tableName: "avaliacoes",
        timestamps: true,
    }
);

user.hasMany(Avaliacao, { foreignKey: "contratanteId", onDelete: "CASCADE" });
user.hasMany(Avaliacao, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
Avaliacao.belongsTo(user, { foreignKey: "contratanteId" });
Avaliacao.belongsTo(user, { foreignKey: "cuidadorId" });

sequelize.sync()
.then(() => {
    console.log("Tabela sincronizada");
})
.catch((error) => {
    console.error("Erro ao sincronizar a tabela", error);
});

export default Avaliacao;