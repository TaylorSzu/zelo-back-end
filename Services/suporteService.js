const suporte = require("../Models/suporteModel");

function registrarSuporte(suport) {
    return suporte.create(suport);
}

function listarSuporte() {
    return suporte.findAll();
}

async function encontrarSuporte(id) {
    return suporte.findByPk(id);
}

async function editarSuporte(id, suport) {
    const SuporteEncontrado = await encontrarSuporte(id);
    if (SuporteEncontrado) {
        return SuporteEncontrado.update(suport);
    } else {
        return null;
    }
}

async function excluirSuporte(id) {
    const SuporteEncontrado = await encontrarSuporte(id);
    if (SuporteEncontrado) {
        return SuporteEncontrado.destroy();
    } else {
        return null;
    }
}

module.exports = {
    registrarSuporte,
    listarSuporte,
    encontrarSuporte,
    editarSuporte,
    excluirSuporte
};
