const Idosos = require("../Models/idosoModel");

function registrarIdoso(idoso) {
  return Idosos.create(idoso);
}

function listarIdoso() {
  return Idosos.findAll();
}

async function encontrarIdoso(id) {
  return Idosos.findByPk(id);
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
