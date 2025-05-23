const pagamento = require("../Models/pagamentoModel");

function registrarPagamento(pagar) {
    return pagamento.create(pagar);
}

function listarPagamento() {
    return pagamento.findAll();
}

async function encontrarPagamento(id) {
    return pagamento.findByPk(id);
}

async function editarPagamento(id, pagar) {
    const PagamentoEncontrado = await encontrarPagamento(id);
    if (PagamentoEncontrado) {
        return PagamentoEncontrado.update(pagar);
    } else {
        return null;
    }
}

async function excluirPagamento(id) {
    const PagamentoEncontrado = await encontrarPagamento(id);
    if (PagamentoEncontrado) {
        return PagamentoEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarPagamento,
    listarPagamento,
    encontrarPagamento,
    editarPagamento,
    excluirPagamento
};
