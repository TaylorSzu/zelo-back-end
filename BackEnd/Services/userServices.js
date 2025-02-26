
import usuario from "../Models/userModel.js";

function registrarUsuario(user){
    return usuario.create(user);
}

function listarUsuarios(){
    return usuario.findAll();
}

async function encontrarUsuario(id){
    return await usuario.findByPk(id);
}

async function editarUsuario(id, user){
    const usuarioEncontrado = await encontrarUsuario(id);
    if (usuarioEncontrado) {
        return await usuarioEncontrado.update(user);
    } else {
        return null;
    }
}

async function excluirUsuario(id){
    const usuarioEncontrado = await usuario.findByPk(id);
    if (usuarioEncontrado) {
        return await usuarioEncontrado.destroy();
    } else {
        return null;
    }
}

async function login(email, senha) {
    const user = await usuario.findOne({ where: { email: email, senha: senha } });
    if (user) {
        return user;
    } else {
        return null;
    }
}


export default {
    registrarUsuario,
    listarUsuarios, 
    encontrarUsuario,
    editarUsuario,
    excluirUsuario,
    login
};