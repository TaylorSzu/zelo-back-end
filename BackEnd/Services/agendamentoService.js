import { Op } from "sequelize";
import Agendamento from "../Models/agendamentoModel.js"; 
import Contratantes from "../Models/contratanteModel.js";
import Cuidadores from "../Models/cuidadorModel.js";
import cron from "node-cron";

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

async function aceitarAgendamento(id, userId) {
    const agendamento = await Agendamento.findOne({ where: { id: id, cuidadorId: userId } });
    if(!agendamento){
        throw new Error("Agendamento não encontrado ou não pertence a você.");
    }
    return await Agendamento.update({ status: "confirmado" }, { where: { id: id } });
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


export default { registrarAgendamento ,aceitarAgendamento, cancelarAgendamento, limparAgendamentos };
