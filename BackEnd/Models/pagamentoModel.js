import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import user from "../Models/userModel.js";

const Pagamento = sequelize.define("Pagamento", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        contratanteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cuidadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        agendamentoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valorTotal: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        taxa: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.15
        },
        dataPagamento: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        metodoPagamento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pendente",
        },
        mercadoPagoId: {
            type: DataTypes.STRING,
            unique: true,
        },
        mercadoPagoStatus: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "pagamentos",
        timestamps: true
    }
);

user.hasMany(Pagamento, { foreignKey: "contratanteId", onDelete: "CASCADE" });
user.hasMany(Pagamento, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
user.hasMany(Pagamento, { foreignKey: "agendamentoId", onDelete: "CASCADE" });
Pagamento.belongsTo(user, { foreignKey: "contratanteId" });
Pagamento.belongsTo(user, { foreignKey: "cuidadorId" });
Pagamento.belongsTo(user, { foreignKey: "agendamentoId" });

sequelize.sync()
    .then(() => {
        console.log("Tabela Contratantes sincronizada");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar a tabela Contratantes", error);
    });

export default Pagamento;