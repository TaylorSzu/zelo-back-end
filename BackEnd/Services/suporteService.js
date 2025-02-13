
import suporte from "../Models/suporteModel.js";

function registrarSuporte(suport){
    return suporte.create(suport);
}

function listarSuporte(){
    return suporte.findAll();
}

function encontrarSuporte(id){
    return suporte.findByPk(id);
}


function editarSuporte(id, suport){
    const SuporteEncontrado = encontrarSuporte(id);
    if (SuporteEncontrado) {
        return SuporteEncontrado.update(suport);
    } else {
        return null;
    }
}

function excluirSuporte(id){
    const SuporteEncontrado = encontrarSuporte(id);
    if (SuporteEncontrado) {
        return SuporteEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarSuporte, listarSuporte, encontrarSuporte, editarSuporte, excluirSuporte};