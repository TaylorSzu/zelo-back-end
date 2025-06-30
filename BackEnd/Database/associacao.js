const connected = require("./Database.js");
const User = require("../Models/userModel.js");
const Contratantes = require("../Models/contratanteModel.js");
const Cuidadores = require("../Models/cuidadorModel.js");
const Agendamento = require("../Models/agendamentoModel.js");
const Pagamento = require("../BankApi/pagamentoModel.js");
const Idosos = require("../Models/idosoModel");
const Avaliacao = require("../Models/avaliacaoModel.js");

function associarModelos() {
  // Cuidador
  User.hasMany(Cuidadores, { foreignKey: "usuarioId", onDelete: "CASCADE" });
  Cuidadores.belongsTo(User, { foreignKey: "usuarioId" });

  Cuidadores.hasMany(Agendamento, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });

  // Contratante
  User.hasMany(Contratantes, { foreignKey: "usuarioId", onDelete: "CASCADE" });
  Contratantes.belongsTo(User, { foreignKey: "usuarioId" });

  Contratantes.hasMany(Agendamento, {
    foreignKey: "contratanteId",
    onDelete: "CASCADE",
  });
  Agendamento.belongsTo(Contratantes, { foreignKey: "contratanteId" });

  //Avaliação
  Cuidadores.hasMany(Avaliacao, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Avaliacao.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });

  // Avaliação está vinculada a um Agendamento
  Agendamento.hasMany(Avaliacao, {
    foreignKey: "agendamentoId",
    onDelete: "CASCADE",
  });
  Avaliacao.belongsTo(Agendamento, { foreignKey: "agendamentoId" });

  // Idoso
  Contratantes.hasMany(Idosos, {
    foreignKey: "contratanteId",
    onDelete: "CASCADE",
  });
  Idosos.belongsTo(Contratantes, { foreignKey: "contratanteId" });

  Idosos.hasMany(Agendamento, { foreignKey: "idosoId", onDelete: "CASCADE" });
  Agendamento.belongsTo(Idosos, { foreignKey: "idosoId" });

  // Pagamento
  Contratantes.hasMany(Pagamento, {
    foreignKey: "contratanteId",
    onDelete: "CASCADE",
  });
  Pagamento.belongsTo(Contratantes, { foreignKey: "contratanteId" });

  Cuidadores.hasMany(Pagamento, {
    foreignKey: "cuidadorId",
    onDelete: "CASCADE",
  });
  Pagamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });

  Agendamento.hasMany(Pagamento, {
    foreignKey: "agendamentoId",
    onDelete: "CASCADE",
  });
  Pagamento.belongsTo(Agendamento, { foreignKey: "agendamentoId" });
}

// Sincronização com o banco
associarModelos();
connected
  .sync()
  .then(() => {
    console.log("✅ Banco de dados sincronizado com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar com o banco de dados:", error);
  });

//Função para associar corretamente os modelos

module.exports = {
  User,
  Contratantes,
  Cuidadores,
  Agendamento,
  Idosos,
  Avaliacao,
  associarModelos,
};
