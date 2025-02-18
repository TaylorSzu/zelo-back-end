
import contrantante from "../Models/contratanteModel.js";

function registrarContratante(contratar){
    return contrantante.create(contratar);
}

function listarContratante(){
    return contrantante.findAll();
}

async function encontrarContratante(id){
    return contrantante.findByPk(id);
}


async function editarContratante(id, contratar){
    const ContratanteEncontrado = await encontrarContratante(id);
    if (ContratanteEncontrado) {
        return ContratanteEncontrado.update(contratar);
    } else {
        return null;
    }
}

async function excluirContratante(id){
    const ContratanteEncontrado = await encontrarContratante(id);
    if (ContratanteEncontrado) {
        return ContratanteEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarContratante, listarContratante, encontrarContratante, editarContratante, excluirContratante};