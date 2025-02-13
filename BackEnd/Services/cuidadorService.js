import cuidador from '../Models/cuidadorModel.js'

function registrarCuidador(cuidar) {
    return cuidador.create(cuidar);
}

function listarCuidador(){
    return cuidador.findAll();
}

function encontrarCuidador(id){
    return cuidador.findByPk(id);
}

function editarCuidador(id, cuidar){
    const cuidadorEncontrado = encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.update(cuidar);
    } else {
        return null
    }
}

function excluirCuidador(id){
    const cuidadorEncontrado = encontrarCuidador(id);
    
    if(cuidadorEncontrado) {
        return cuidadorEncontrado.destroy();

    } else {
        return null;
    }
}