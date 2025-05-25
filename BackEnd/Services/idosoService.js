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
        model: Contratante,
        attributes: { exclude: ["usuarioId"] },
        include: [
          {
            model: Usuario,
            attributes: { exclude: ["cpf", "email", "senha", "senha"] }
          }
        ]
      }
    ]
  });
}

async function encontrarIdoso(id) {
  return Idosos.findOne({
    where: {id},
    include: [
      {
        model: Contratante,
        attributes: { exclude: ["usuarioId"] },
        include: [
          {
            model: Usuario,
            attributes: { exclude: ["cpf", "email", "senha", "senha"] }
          }
        ]
      }
    ]
  });
}

async function editarIdoso(id, idoso) {
  const idosoEncontrado = await Idosos.findByPk(id);
  if (idosoEncontrado) {
    return idosoEncontrado.update(idoso);
  } else {
    return null;
  }
}

async function excluirIdoso(id) {
  const idosoEncontrado = await Idosos.findByPk(id);
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
