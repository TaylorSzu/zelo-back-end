import cuidador from '../Models/cuidadorModel.js'
import Usuario from '../Models/userModel.js'

function registrarCuidador(cuidar) {
    return cuidador.create(cuidar);
}

function listarCuidador(){
    return cuidador.findAll({include: {
        model: Usuario,
        attributes: {exclude: ["senha"]}
    }});
}

async function encontrarCuidador(id){
    return cuidador.findByPk(id);
}

async function editarCuidador(id, cuidar){
    const cuidadorEncontrado = await encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.update(cuidar);
    } else {
        return null
    }
}

async function excluirCuidador(id){
    const cuidadorEncontrado = await encontrarCuidador(id);
    
    if(cuidadorEncontrado) {
        return cuidadorEncontrado.destroy();

    } else {
        return null;
    }
}

export default {registrarCuidador, listarCuidador, encontrarCuidador, editarCuidador, excluirCuidador}