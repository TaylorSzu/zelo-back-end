const { Op, where } = require("sequelize");
const Agendamento = require("../Models/agendamentoModel.js");
const Contratantes = require("../Models/contratanteModel.js");
const Cuidadores = require("../Models/cuidadorModel.js");
const User = require("../Models/userModel.js");
const cron = require("node-cron");

async function registrarAgendamento(agendamento) {
    const contratanteExiste = await Contratantes.findByPk(agendamento.contratanteId);
    if (!contratanteExiste) {
        throw new Error("Contratante não encontrado.");
    }
    const cuidadorExiste = await Cuidadores.findByPk(agendamento.cuidadorId);
    if (!cuidadorExiste) {
        throw new Error("Cuidador não encontrado.");
    }
    return Agendamento.create(agendamento);
}

async function aceitarAgendamento(idAgendamento, idCuidador) {

    console.log("📥 ID do agendamento recebido:", idAgendamento);
    console.log("📥 ID do cuidador recebido:", idCuidador);
    
    const agendamento = await Agendamento.findOne({
        where: {
            id: idAgendamento,
            cuidadorId: idCuidador,
        }
    });

    if (!agendamento){
        console.log("❌ Agendamento não encontrado ou não pertence ao cuidador");
        throw new Error("Agendamento não encontrado ou não pertence a você.");
    }

    return await Agendamento.update( {status: "confirmado"}, {where: {id: idAgendamento}} );
}

async function cancelarAgendamento(id, userId) {
    const agendamento = await Agendamento.findOne({ where: { id: id } });
    if (!agendamento) {
        throw new Error("Agendamento não encontrado.");
    }
    if (agendamento.contratanteId !== userId && agendamento.cuidadorId !== userId) {
        throw new Error("Você não tem permissão para cancelar este agendamento.");
    }
    await Agendamento.update({ status: "cancelado" }, { where: { id: id } });
    return { msg: "Agendamento cancelado com sucesso." };
}

async function listarAgendamentosCuidador() {
    const agendamentos = await Agendamento.findAll({
        include: [
            {model: Cuidadores, attributes:["id", "disponibilidade", "valorHora", "valorPeriodo", "especialidade"],
                include: [
                    {model: User, attributes:["id", "nome"]},
                ]
            }
        ]
    });
    return agendamentos;
}

async function listarAgendamentosContratante() {
    const agendamentos = await Agendamento.findAll({
        include: [
            {model: Contratantes, attributes:["id", "necessidades"],
                include: [
                    {model: User, attributes:["id", "nome", "endereco"]},
                ]
            }
        ]
    });
    return agendamentos;
}

async function encontrarAgendamentoCuidadores(id){
    const agendamentos = await Agendamento.findOne({where: {id: id},
        include: [
            {model: Cuidadores, attributes:["id", "disponibilidade", "valorHora", "valorPeriodo", "especialidade"],
                include: [
                    {model: User, attributes:["id", "nome"]},
                ]
            }
        ]
    });
    return agendamentos;
}

async function encontrarAgendamentoContratantes(id) {
    const agendamentos = await Agendamento.findOne({where: {id: id},
        include: [
            {model: Contratantes, attributes:["id", "necessidades"],
                include: [
                    {model: User, attributes:["id", "nome", "endereco"]},
                ]
            }
        ]
    });
    return agendamentos;
}

async function limparAgendamentos() {
    const agora = new Date();

    const agendamentos = await Agendamento.findAll({
        where: {
            status: { [Op.or]: ["pendente", "cancelado"] }, 
            createdAt: {
                [Op.lt]: new Date(agora.getTime() - 2 * 24 * 60 * 60 * 1000), 
            },
        },
    });

    for (const agendamento of agendamentos) {
        await agendamento.destroy();
        console.log(`Agendamento ${agendamento.id} foi removido por inatividade ou cancelamento antigo.`);
    }
}

cron.schedule("0 3 */2 * *", () => {
    limparAgendamentos();
});

module.exports = { 
    registrarAgendamento, 
    aceitarAgendamento, 
    cancelarAgendamento, 
    listarAgendamentosCuidador, 
    listarAgendamentosContratante, 
    encontrarAgendamentoCuidadores, 
    encontrarAgendamentoContratantes, 
    limparAgendamentos 
};