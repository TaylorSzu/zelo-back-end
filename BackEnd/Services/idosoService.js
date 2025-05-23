const Idosos = require("../Models/idosoModel.js");
const Usuario = require("../Models/userModel.js");
const Contratante = require("../Models/contratanteModel.js");

function registrarIdoso(idoso) {
  return Idosos.create(idoso);
}

function listarIdoso() {
  return Idosos.findAll({
    include: [
      {
        model: Usuario,
        attributes: {exclude: ["cpf", "email", "senha"]}
      },
      {
        model: Contratante,
        attributes: {exclude: ["usuarioId"]}
      } 
    ]
  });
}

async function encontrarIdoso(id) {
  return Idosos.findOne({
    where: {id},
    include: [
      {
        model: Usuario,
        attributes: {exclude: ["cpf", "email", "senha"]}
      },
      {
        model: Contratante,
        attributes: {exclude: ["usuarioId"]}
      }
    ]
  });
}

async function editarIdoso(id, idoso) {
  const idosoEncontrado = await encontrarIdoso(id);
  if (idosoEncontrado) {
    return idosoEncontrado.update(idoso);
  } else {
    return null;
  }
}

async function excluirIdoso(id) {
  const idosoEncontrado = await encontrarIdoso(id);
  if (idosoEncontrado) {
    return idosoEncontrado.destroy();
  } else {
    return null;
  }
}

module.exports = {
  registrarIdoso,
  listarIdoso,
  encontrarIdoso,
  editarIdoso,
  excluirIdoso,
};
