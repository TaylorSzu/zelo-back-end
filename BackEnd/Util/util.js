const Cuidadores = require("../Models/cuidadorModel.js");
const User = require("../Models/userModel.js");
const Pagamento = require("../BankApi/pagamentoModel.js");
const Agendamento = require("../Models/agendamentoModel.js");
const Idoso = require("../Models/idosoModel.js");

async function dashboardCuidador(cuidadorId) {
    const pagamentos = await Pagamento.findAll({
        where: { cuidadorId },
        attributes: ["valorHora"]
    });

    const agendamentoPendentes = await Agendamento.findAll({
        where: { cuidadorId, status: "pendente" }
    });

    const agendamentoConfirmados = await Agendamento.findAll({
        where: { cuidadorId, status: "confirmado" }
    });

    let soma = 0;
    pagamentos.forEach(pagamento => {
        soma += pagamento.valorHora;
    });

    let totalPendentes = agendamentoPendentes.length;
    let totalConfirmados = agendamentoConfirmados.length;

    return {
        totalRecebido: soma,
        totalConfirmados,
        totalPendentes
    };
}

async function dashboardContratante(contratanteId) {
    const idosos = (await Idoso.findAll({ where: { contratanteId } })).length;

    const agendamentoConfirmados = (
        await Agendamento.findAll({ where: { contratanteId, status: "confirmado" } })
    ).length;

    const agendamentoPendentes = (
        await Agendamento.findAll({ where: { contratanteId, status: "pendente" } }) // Corrigi "pendentes" para "pendente", verifique o valor correto no banco
    ).length;

    const pagamentoPendentes = (
        await Pagamento.findAll({ where: { contratanteId, status: "Pendente" } })
    ).length;

    return {
        idosos,
        agendamentoConfirmados,
        agendamentoPendentes,
        pagamentoPendentes
    };
}

module.exports = {
    dashboardCuidador,
    dashboardContratante
}