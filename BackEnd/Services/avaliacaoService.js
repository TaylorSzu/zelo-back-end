const avaliacao = require("../Models/avaliacaoModel");

function registrarAvaliacao(avaliar) {
    return avaliacao.create(avaliar);
}

function listarAvaliacao() {
    return avaliacao.findAll();
}

async function encontrarAvaliacao(id) {
    return await avaliacao.findByPk(id);
}

async function editarAvaliacao(id, avaliar) {
    const avaliacaoEncontrada = await encontrarAvaliacao(id);
    if (avaliacaoEncontrada) {
        return await avaliacaoEncontrada.update(avaliar);
    } else {
        return null;
    }
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
    encontrarAvaliacao,
    editarAvaliacao,
    excluirAvaliacao
};
