
import agendamento from "../Models/agendamentoModel.js";

function registrarAgendamento(agendar){
    return agendamento.create(agendar);
}

function listarAgendamento(){
    return agendamento.findAll();
}

function encontrarAgendamento(id){
    return agendamento.findByPk(id);
}


function editarAgendamento(id, agendar){
    const AgendamentoEncontrado = encontrarAgendamento(id);
    if (AgendamentoEncontrado) {
        return AgendamentoEncontrado.update(agendar);
    } else {
        return null;
    }
}

function excluirAgendamento(id){
    const AgendamentoEncontrado = encontrarAgendamento(id);
    if (AgendamentoEncontrado) {
        return AgendamentoEncontrado.destroy();
    } else {
        return null;
    }
}

export default {registrarAgendamento, listarAgendamento, encontrarAgendamento, editarAgendamento, excluirAgendamento};