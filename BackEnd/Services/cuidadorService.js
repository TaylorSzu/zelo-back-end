const { where } = require("sequelize");
const cuidador = require("../Models/cuidadorModel.js");
const Usuario = require("../Models/userModel.js");
const Avaliacao = require("../Models/avaliacaoModel.js");
const { User } = require("mercadopago");

function registrarCuidador(cuidar) {
    return cuidador.create(cuidar);
}

function listarCuidador() {
    return cuidador.findAll({
        include: [
            {
                model: Usuario,
                attributes: { exclude: ["senha"] }
            },
            {
                model: Avaliacao,
                attributes: ['estrelas', 'comentario'],
            }
        ]
    });
}

async function encontrarCuidador(id) {
    return cuidador.findOne({
        where: {id}, 
        include: [
            {
                model: Usuario,
                attributes: ['nome', 'email' ,'telefone'],
            },
            {
                model: Avaliacao,
                attributes: ['estrelas', 'comentario'],
            }
        ]
    });
}

async function editarCuidador(id, cuidar) {
    const cuidadorEncontrado = await encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.update(cuidar);
    } else {
        return null;
    }
}

async function excluirCuidador(id) {
    const cuidadorEncontrado = await encontrarCuidador(id);
    if (cuidadorEncontrado) {
        return cuidadorEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarCuidador,
    listarCuidador,
    encontrarCuidador,
    editarCuidador,
    excluirCuidador
};
