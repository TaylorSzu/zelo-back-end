
import avaliacao from "../Models/avaliacaoModel.js";

function registrarAvaliacao(avaliar){
    return avaliacao.create(avaliar);
}

function listarAvaliacao(){
    return avaliacao.findAll();
}

async function encontrarAvaliacao(id){
    return await avaliacao.findByPk(id);
}


async function editarAvaliacao(id, avaliar){
    const AvaliacaoEncontrado = encontrarAvaliacao(id);
    if (AvaliacaoEncontrado) {
        return await AvaliacaoEncontrado.update(avaliar);
    } else {
        return null;
    }
}

async function excluirAvaliacao(id){
    const AvaliacaoEncontrado = encontrarAvaliacao(id);
    if (AvaliacaoEncontrado) {
        return await AvaliacaoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarAvaliacao, listarAvaliacao, encontrarAvaliacao, editarAvaliacao, excluirAvaliacao};