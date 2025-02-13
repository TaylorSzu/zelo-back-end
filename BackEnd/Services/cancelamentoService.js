
import cancelamento from "../Models/cancelamentoModel.js";

function registrarCancelamento(cancel){
    return cancelamento.create(cancel);
}

function listarCancelamentos(){
    return cancelamento.findAll();
}

function encontrarCancelamento(id){
    return cancelamento.findByPk(id);
}


function editarCancelamento(id, cancel){
    const CancelamentoEncontrado = encontrarCancelamento(id);
    if (CancelamentoEncontrado) {
        return CancelamentoEncontrado.update(cancel);
    } else {
        return null;
    }
}

function excluirCancelamento(id){
    const CancelamentoEncontrado = encontrarCancelamento(id);
    if (CancelamentoEncontrado) {
        return CancelamentoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarCancelamento, listarCancelamentos, encontrarCancelamento, editarCancelamento, excluirCancelamento};

