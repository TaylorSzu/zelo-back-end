const cancelamento = require("../Models/cancelamentoModel");

function registrarCancelamento(cancel) {
    return cancelamento.create(cancel);
}

function listarCancelamentos() {
    return cancelamento.findAll();
}

async function encontrarCancelamento(id) {
    return await cancelamento.findByPk(id);
}

async function editarCancelamento(id, cancel) {
    const cancelamentoEncontrado = await encontrarCancelamento(id);
    if (cancelamentoEncontrado) {
        return await cancelamentoEncontrado.update(cancel);
    } else {
        return null;
    }
}

async function excluirCancelamento(id) {
    const cancelamentoEncontrado = await encontrarCancelamento(id);
    if (cancelamentoEncontrado) {
        return await cancelamentoEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarCancelamento,
    listarCancelamentos,
    encontrarCancelamento,
    editarCancelamento,
    excluirCancelamento
};
