const sequelize = require("../Database/Database");
const avaliacao = require("../Models/avaliacaoModel");
const Cuidadores = require("../Models/cuidadorModel.js");
const User = require("../Models/userModel.js");

function registrarAvaliacao(avaliar) {
  return avaliacao.create(avaliar);
}

function listarAvaliacao() {
  return avaliacao.findAll();
}

// ✅ Função para calcular a média de avaliação de um cuidador
async function calcularMediaAvaliacao(cuidadorId) {
  const resultado = await avaliacao.findAll({
    attributes: [
      "cuidadorId",
      [sequelize.fn("AVG", sequelize.col("estrelas")), "mediaAvaliacao"],
    ],
    where: { cuidadorId },
    group: ["cuidadorId"],
  });

  if (resultado.length === 0) {
    return null;
  }

  return parseFloat(resultado[0].dataValues.mediaAvaliacao).toFixed(2);
}

module.exports = {
  registrarAvaliacao,
  listarAvaliacao,
  calcularMediaAvaliacao, // <- nova função exportada
};
