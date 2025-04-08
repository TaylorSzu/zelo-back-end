const privacidade = require("../Models/privacidadeModel");

function registrarPrivacidade(privaci) {
    return privacidade.create(privaci);
}

function listarPrivacidade() {
    return privacidade.findAll();
}

async function encontrarPrivacidade(id) {
    return privacidade.findByPk(id);
}

async function editarPrivacidade(id, privaci) {
    const PrivacidadeEncontrado = await encontrarPrivacidade(id);
    if (PrivacidadeEncontrado) {
        return PrivacidadeEncontrado.update(privaci);
    } else {
        return null;
    }
}

async function excluirPrivacidade(id) {
    const PrivacidadeEncontrado = await encontrarPrivacidade(id);
    if (PrivacidadeEncontrado) {
        return PrivacidadeEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarPrivacidade,
    listarPrivacidade,
    encontrarPrivacidade,
    editarPrivacidade,
    excluirPrivacidade
};
