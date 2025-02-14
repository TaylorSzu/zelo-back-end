
import privacidade from "../Models/privacidadeModel.js";

function registrarPrivacidade(privaci){
    return privacidade.create(privaci);
}

function listarPrivacidade(){
    return privacidade.findAll();
}

function encontrarPrivacidade(id){
    return privacidade.findByPk(id);
}


function editarPrivacidade(id, privaci){
    const PrivacidadeEncontrado = encontrarPrivacidade(id);
    if (PrivacidadeEncontrado) {
        return PrivacidadeEncontrado.update(privaci);
    } else {
        return null;
    }
}

function excluirPrivacidade(id){
    const PrivacidadeEncontrado = encontrarPrivacidade(id);
    if (PrivacidadeEncontrado) {
        return PrivacidadeEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarPrivacidade, listarPrivacidade, encontrarPrivacidade, editarPrivacidade, excluirPrivacidade};

