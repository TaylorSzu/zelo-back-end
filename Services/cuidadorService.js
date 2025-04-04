const cuidador = require("../Models/cuidadorModel");
const Usuario = require("../Models/userModel");

function registrarCuidador(cuidar) {
    return cuidador.create(cuidar);
}

function listarCuidador() {
    return cuidador.findAll({
        include: {
            model: Usuario,
            attributes: { exclude: ["senha"] }
        }
    });
}

async function encontrarCuidador(id) {
    return cuidador.findByPk(id);
}

async function editarCuidador(id, cuidar) {
    const cuidadorEncontrado = await encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.update(cuidar);
    } else {
        return null;
    }
}

async function excluirCuidador(id) {
    const cuidadorEncontrado = await encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarCuidador,
    listarCuidador,
    encontrarCuidador,
    editarCuidador,
    excluirCuidador
};
