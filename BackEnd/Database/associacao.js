const connected = require("./Database.js");
const User = require("../Models/userModel.js");
const Contratante = require("../Models/contratanteModel.js");
const Cuidador = require("../Models/cuidadorModel.js");
const Agendamento = require("../Models/agendamentoModel.js");
const Pagamento = require("../Models/pagamentoModel.js");
const Idosos = require("../Models/idosoModel");
const Avaliacao = require("../Models/avaliacaoModel.js");

function associarModelos() {
  // Cuidador
  User.hasMany(Cuidador, { foreignKey: "usuarioId", onDelete: "CASCADE" });
  Cuidador.belongsTo(User, { foreignKey: "usuarioId" });

  Cuidador.hasMany(Agendamento, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Agendamento.belongsTo(Cuidador, { foreignKey: "cuidadorId" });

  Cuidador.hasMany(Contratante, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Contratante.belongsTo(Cuidador, { foreignKey: "cuidadorId" });

  // Contratante
  User.hasMany(Contratante, { foreignKey: "usuarioId", onDelete: "CASCADE" });
  Contratante.belongsTo(User, { foreignKey: "usuarioId" });

  Contratante.hasMany(Agendamento, {
    foreignKey: "contratanteId",
    onDelete: "CASCADE",
  });
  Agendamento.belongsTo(Contratante, { foreignKey: "contratanteId" });

  //Adicionado relacionamento entre avalições e cuidadores
  Cuidador.hasMany(Avaliacao, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Avaliacao.belongsTo(Cuidador, { foreignKey: "cuidadorId" });

  Contratante.hasMany(Idosos, { foreignKey: "contratanteId" });
  Idosos.belongsTo(Contratante, { foreignKey: "contratanteId" });

  // Pagamento
  User.hasMany(Pagamento, { foreignKey: "contratanteId", onDelete: "CASCADE" });
  User.hasMany(Pagamento, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
  User.hasMany(Pagamento, { foreignKey: "agendamentoId", onDelete: "CASCADE" });

  Pagamento.belongsTo(User, { foreignKey: "contratanteId" });
  Pagamento.belongsTo(User, { foreignKey: "cuidadorId" });
  Pagamento.belongsTo(User, { foreignKey: "agendamentoId" });
}

// Sincronização com o banco
connected
  .sync()
  .then(() => {
    console.log("✅ Banco de dados sincronizado com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar com o banco de dados:", error);
  });

module.exports = {
  User,
  Contratante,
  Cuidador,
  Agendamento,
  Idosos,
  Avaliacao,
  associarModelos,
};
