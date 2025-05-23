const contratante = require("../Models/contratanteModel.js");
const user = require("../Models/userModel.js")

function registrarContratante(contratar) {
    return contratante.create(contratar);
}

function listarContratante() {
    return contratante.findAll({
        include: [
            {
                model: user,
                attributes:{ exclude: ["usuarioId"] },
            }
        ]
    });
}

async function encontrarContratante(id) {
    return contratante.findOne({
        where: {id},
        include: [
            {
                model: user,
                attributes:{ exclude: ["usuarioId"] },
            }
        ]
    });
}

async function editarContratante(id, contratar) {
    const contratanteEncontrado = await encontrarContratante(id);
    if (contratanteEncontrado) {
        return contratanteEncontrado.update(contratar);
    } else {
        return null;
    }
}

async function excluirContratante(id) {
    const contratanteEncontrado = await encontrarContratante(id);
    if (contratanteEncontrado) {
        return contratanteEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarContratante,
    listarContratante,
    encontrarContratante,
    editarContratante,
    excluirContratante
};
