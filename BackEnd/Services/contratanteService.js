
import contrantante from "../Models/contratanteModel.js";

function registrarContratante(contratar){
    return contrantante.create(contratar);
}

function listarContratante(){
    return contrantante.findAll();
}

function encontrarContratante(id){
    return contrantante.findByPk(id);
}


function editarContratante(id, contratar){
    const ContratanteEncontrado = encontrarContratante(id);
    if (ContratanteEncontrado) {
        return ContratanteEncontrado.update(contratar);
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