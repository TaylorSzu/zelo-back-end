const sequelize = require("../Database/Database");
const Avaliacao = require("../Models/avaliacaoModel");
const Cuidadores = require("../Models/cuidadorModel.js");
const User = require("../Models/userModel.js");

function registrarAvaliacao(avaliar) {
  return Avaliacao.create(avaliar);
}

async function editarAvaliacao(avaliacao, id, usuarioId){
  const usuario = await User.findByPk(usuarioId);
  const editarAvaliacao = await Avaliacao.findByPk(id);

  if (!editarAvaliacao) {
    console.log("❌ Avaliação não existe.");
    return null;
  }

  if (!usuario || usuario.tipoUsuario !== "Paciente") {
    console.log("❌ Apenas pacientes podem editar avaliações.");
    return null;
  }

  await editarAvaliacao.update(avaliacao);
  const media = await  calcularMediaAvaliacao(editarAvaliacao.cuidadorId);

  return {
    mensagem: "Avaliação atualizada com sucesso!",
    mediaAtualizada: media
  };
}

// ✅ Função para calcular a média de avaliação de um cuidador
async function calcularMediaAvaliacao(cuidadorId) {
  const resultado = await Avaliacao.findAll({
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
  editarAvaliacao,
  listarAvaliacao,
  calcularMediaAvaliacao
};
