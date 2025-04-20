const avaliacao = require("../Models/avaliacaoModel");
const Cuidadores = require("../Models/cuidadorModel.js");
const User = require("../Models/userModel.js");

function registrarAvaliacao(avaliar) {
    return avaliacao.create(avaliar);
}

function listarAvaliacao() {
    return avaliacao.findAll();
}

async function excluirAvaliacao(id) {
    const avaliacaoEncontrada = await encontrarAvaliacao(id);
    if (avaliacaoEncontrada) {
        return await avaliacaoEncontrada.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarAvaliacao,
    listarAvaliacao,
    excluirAvaliacao
};
