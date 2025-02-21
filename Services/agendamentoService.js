
import agendamento from "../Models/agendamentoModel.js";

function registrarAgendamento(agendar){
    return agendamento.create(agendar);
}

function listarAgendamento(){
    return agendamento.findAll();
}

async function encontrarAgendamento(id){
    return await agendamento.findByPk(id);
}


async function editarAgendamento(id, agendar){
    const AgendamentoEncontrado = await encontrarAgendamento(id);
    if (AgendamentoEncontrado) {
        return await AgendamentoEncontrado.update(agendar);
    } else {
        return null;
    }
}

async function excluirAgendamento(id){
    const AgendamentoEncontrado = await encontrarAgendamento(id);
    if (AgendamentoEncontrado) {
        return await AgendamentoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarAgendamento, listarAgendamento, encontrarAgendamento, editarAgendamento, excluirAgendamento};