
import avaliacao from "../Models/avaliacaoModel.js";

function registrarAvaliacao(avaliar){
    return avaliacao.create(avaliar);
}

function listarAvaliacao(){
    return avaliacao.findAll();
}

function encontrarAvaliacao(id){
    return avaliacao.findByPk(id);
}


function editarAvaliacao(id, avaliar){
    const AvaliacaoEncontrado = encontrarAvaliacao(id);
    if (AvaliacaoEncontrado) {
        return AvaliacaoEncontrado.update(avaliar);
    } else {
        return null;
    }
}

function excluirAvaliacao(id){
    const AvaliacaoEncontrado = encontrarAvaliacao(id);
    if (AvaliacaoEncontrado) {
        return AvaliacaoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarAvaliacao, listarAvaliacao, encontrarAvaliacao, editarAvaliacao, excluirAvaliacao};