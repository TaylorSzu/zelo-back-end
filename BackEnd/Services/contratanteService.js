
import contrantante from "../Models/contratanteModel.js";

function registrarContratante(privaci){
    return contrantante.create(privaci);
}

function listarContratante(){
    return contrantante.findAll();
}

function encontrarContratante(id){
    return contrantante.findByPk(id);
}


function editarContratante(id, privaci){
    const ContratanteEncontrado = encontrarContratante(id);
    if (ContratanteEncontrado) {
        return ContratanteEncontrado.update(privaci);
    } else {
        return null;
    }
}

function excluirContratante(id){
    const ContratanteEncontrado = encontrarContratante(id);
    if (ContratanteEncontrado) {
        return ContratanteEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarContratante, listarContratante, encontrarContratante, editarContratante, excluirContratante};