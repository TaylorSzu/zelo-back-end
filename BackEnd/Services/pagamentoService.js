
import pagamento from "../Models/pagamentoModel.js";

function registrarPagamento(pagar){
    return pagamento.create(pagar);
}

function listarPagamento(){
    return pagamento.findAll();
}

function encontrarPagamento(id){
    return pagamento.findByPk(id);
}


function editarPagamento(id, pagar){
    const PagamentoEncontrado = encontrarPagamento(id);
    if (PagamentoEncontrado) {
        return PagamentoEncontrado.update(pagar);
    } else {
        return null;
    }
}

function excluirPagamento(id){
    const PagamentoEncontrado = encontrarPagamento(id);
    if (PagamentoEncontrado) {
        return PagamentoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarPagamento, listarPagamento, encontrarPagamento, editarPagamento, excluirPagamento};