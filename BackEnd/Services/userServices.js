import usuario from "../Models/userModel.js";

function registrarUsuario(user){
    return usuario.create(user);
}

function listarUsuarios(){
    return usuario.findAll();
}

function encontrarUsuario(id){
    return usuario.findByPk(id);
}


function editarUsuario(id, user){
    const usuarioEncontrado = encontrarUsuario(id);
    if (usuarioEncontrado) {
        return usuarioEncontrado.update(user);
    } else {
        return null;
    }
}

function excluirUsuario(id){
    const usuarioEncontrado = encontrarUsuario(id);
    if (usuarioEncontrado) {
        return usuarioEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarUsuario, listarUsuarios, encontrarUsuario, editarUsuario, excluirUsuario};