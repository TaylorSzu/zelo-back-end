
import cancelamento from "../Models/cancelamentoModel.js";

function registrarCancelamento(cancel){
    return cancelamento.create(cancel);
}

function listarCancelamentos(){
    return cancelamento.findAll();
}

async function encontrarCancelamento(id){
    return await cancelamento.findByPk(id);
}


async function editarCancelamento(id, cancel){
    const CancelamentoEncontrado = await encontrarCancelamento(id);
    if (CancelamentoEncontrado) {
        return await CancelamentoEncontrado.update(cancel);
    } else {
        return null;
    }
}

async function excluirCancelamento(id){
    const CancelamentoEncontrado = await encontrarCancelamento(id);
    if (CancelamentoEncontrado) {
        return await CancelamentoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarCancelamento, listarCancelamentos, encontrarCancelamento, editarCancelamento, excluirCancelamento};

