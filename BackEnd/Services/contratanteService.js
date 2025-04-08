const contratante = require("../Models/contratanteModel");

function registrarContratante(contratar) {
    return contratante.create(contratar);
}

function listarContratante() {
    return contratante.findAll();
}

async function encontrarContratante(id) {
    return contratante.findByPk(id);
}

async function editarContratante(id, contratar) {
    const contratanteEncontrado = await encontrarContratante(id);
    if (contratanteEncontrado) {
        return contratanteEncontrado.update(contratar);
    } else {
        return null;
    }
}

async function excluirContratante(id) {
    const contratanteEncontrado = await encontrarContratante(id);
    if (contratanteEncontrado) {
        return contratanteEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarContratante,
    listarContratante,
    encontrarContratante,
    editarContratante,
    excluirContratante
};
