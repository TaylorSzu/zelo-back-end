import { DataTypes } from "sequelize";
import sequelize from "../Database/Database.js";
import Contratantes from "../Models/contratanteModel.js";

const Agendamento = sequelize.define(
  "Agendamento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contratanteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Contratantes, 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cuidadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cuidadores", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dataHoraInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataHoraFim: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterField(value) {
          if (value <= this.dataHoraInicio) {
            throw new Error("A data de término deve ser depois da data de início.");
          }
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendente",
    },
  },
  {
    tableName: "agendamentos",
    timestamps: true,
  }
);

(async () => {
  const Cuidadores = (await import("../Models/cuidadorModel.js")).default;

  Contratantes.hasMany(Agendamento, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Cuidadores.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });

  Agendamento.belongsTo(Contratantes, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });
})();

sequelize.sync({alter: true})
  .then(() => {
    console.log("Tabela de agendamentos sincronizada.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar a tabela de agendamentos", error);
  });

export default Agendamento;