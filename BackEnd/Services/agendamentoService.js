const { Op } = require("sequelize");
const Agendamento = require("../Models/agendamentoModel.js");
const Contratantes = require("../Models/contratanteModel.js");
const Cuidadore = require("../Models/cuidadorModel.js"); // nome singular conforme uso no include e retorno
const Idosos = require("../Models/idosoModel.js");
const { encontrarIdoso } = require("./idosoService.js");
const User = require("../Models/userModel.js");
const cron = require("node-cron");

async function registrarAgendamento(agendamento) {
  const cuidadorExiste = await Cuidadore.findByPk(agendamento.cuidadorId);
  if (!cuidadorExiste) {
    throw new Error("Cuidador não encontrado.");
  }

  if (agendamento.contratanteId) {
    const contratanteExiste = await Contratantes.findByPk(
      agendamento.contratanteId
    );
    if (!contratanteExiste) {
      throw new Error("Contratante não encontrado.");
    }
  }

  if (agendamento.idosoId) {
    const idosoExiste = await Idosos.findByPk(agendamento.idosoId);
    if (!idosoExiste) {
      throw new Error("Idoso não encontrado.");
    }
  }

  const conflito = await Agendamento.findOne({
    where: {
      cuidadorId: agendamento.cuidadorId,
      status: { [Op.not]: "cancelado" },
      [Op.or]: [
        {
          dataHoraInicio: {
            [Op.between]: [agendamento.dataHoraInicio, agendamento.dataHoraFim],
          },
        },
        {
          dataHoraFim: {
            [Op.between]: [agendamento.dataHoraInicio, agendamento.dataHoraFim],
          },
        },
        {
          [Op.and]: [
            { dataHoraInicio: { [Op.lte]: agendamento.dataHoraInicio } },
            { dataHoraFim: { [Op.gte]: agendamento.dataHoraFim } },
          ],
        },
      ],
    },
  });

  if (conflito) {
    throw new Error("O cuidador já possui um agendamento nesse horário.");
  }

  const novoAgendamento = await Agendamento.create(agendamento);
  return novoAgendamento;
}

async function aceitarAgendamento(idAgendamento, idCuidador) {
  const agendamento = await Agendamento.findOne({
    where: {
      id: idAgendamento,
      cuidadorId: idCuidador,
    },
    attributes: ["id", "cuidadorId", "contratanteId"],
  });

  if (!agendamento) {
    console.log("❌ Agendamento não encontrado ou não pertence ao cuidador");
    throw new Error("Agendamento não encontrado ou não pertence a você.");
  }

  await Agendamento.update(
    { status: "confirmado" },
    { where: { id: idAgendamento } }
  );

  return {
    agendamentoId: agendamento.id,
    cuidadorId: agendamento.cuidadorId,
    contratanteId: agendamento.contratanteId,
  };
}

async function concluirAgendamento(id, cuidadorId) {
  const agendamento = await Agendamento.findOne({
    where: {
      id,
      cuidadorId,
    },
    attributes: ["id", "cuidadorId", "contratanteId"],
  });

  if (!agendamento) {
    console.log("❌ Agendamento não encontrado ou não pertence ao cuidador");
    throw new Error("Agendamento não encontrado ou não pertence a você.");
  }

  await Agendamento.update({ status: "concluido" }, { where: { id: id } });

  return {
    agendamentoId: agendamento.id,
    cuidadorId: agendamento.cuidadorId,
    contratanteId: agendamento.contratanteId,
  };
}

async function cancelarAgendamento(id, contratanteId, cuidadorId) {
  const agendamento = await Agendamento.findOne({ where: { id } });

  if (!agendamento) {
    throw new Error("Agendamento não encontrado.");
  }

  if (!contratanteId && !cuidadorId) {
    throw new Error(
      "É necessário informar contratanteId ou cuidadorId para cancelar."
    );
  }

  const autorizado =
    (contratanteId && agendamento.contratanteId === contratanteId) ||
    (cuidadorId && agendamento.cuidadorId === cuidadorId);

  if (!autorizado) {
    console.log("❌ Usuário não tem permissão para cancelar este agendamento.");
    throw new Error("Você não tem permissão para cancelar este agendamento.");
  }

  await Agendamento.update({ status: "cancelado" }, { where: { id } });

  console.log("✅ Agendamento cancelado com sucesso:", id);
  return { msg: "Agendamento cancelado com sucesso." };
}

async function buscarAgendamentosContratante(contratanteId) {
  const busca = await Agendamento.findAll({
    where: { contratanteId },
    attributes: ["id", "dataHoraInicio", "dataHoraFim", "status", "avaliado"],
    include: [
      {
        model: Cuidadore,
        attributes: ["id", "valorHora", "especialidade"],
        include: [
          {
            model: User,
            attributes: ["nome", "telefone"],
          },
        ],
      },
    ],
    order: [["dataHoraInicio", "ASC"]],
  });

  return busca.map((ag) => ({
    id: ag.id,
    nome: ag.Cuidadore.User.nome,
    especialidade: ag.Cuidadore.especialidade,
    valorHora: ag.Cuidadore.valorHora,
    telefone: ag.Cuidadore.User.telefone,
    data: ag.dataHoraInicio.toISOString().split("T")[0],
    dataHoraInicio: ag.dataHoraInicio,
    dataHoraFim: ag.dataHoraFim,
    status: ag.status,
    avaliado: ag.avaliado,
    cuidadorId: ag.Cuidadore.id,
  }));
}

async function buscarAgendamentosIdoso(contratanteId) {
  const idosos = await Idosos.findAll({
    where: { contratanteId },
    attributes: ["id"],
  });

  const idosoIds = idosos.map((idoso) => idoso.id);

  const busca = await Agendamento.findAll({
    where: { idosoId: idosoIds },
    attributes: ["id", "dataHoraInicio", "dataHoraFim", "status"],
    include: [
      {
        model: Cuidadore,
        attributes: ["valorHora", "especialidade"],
        include: [
          {
            model: User,
            attributes: ["nome", "telefone"],
          },
        ],
      },
    ],
    order: [["dataHoraInicio", "ASC"]],
  });

  return busca.map((ag) => ({
    id: ag.id,
    nome: ag.Cuidadore.User.nome,
    especialidade: ag.Cuidadore.especialidade,
    valorHora: ag.Cuidadore.valorHora,
    telefone: ag.Cuidadore.User.telefone,
    data: ag.dataHoraInicio.toISOString().split("T")[0],
    dataHoraInicio: ag.dataHoraInicio,
    dataHoraFim: ag.dataHoraFim,
    status: ag.status,
  }));
}

async function buscarAgendamentosCuidador(cuidadorId) {
  const busca = await Agendamento.findAll({
    where: {
      [Op.and]: [{ cuidadorId }, { status: "confirmado" }],
    },
    attributes: ["id", "idosoId", "dataHoraInicio", "dataHoraFim", "status"],
    include: [
      {
        model: Contratantes,
        attributes: ["observacoesMedicas"],
        include: [
          {
            model: User,
            attributes: ["nome", "endereco", "telefone"],
          },
        ],
      },
      {
        model: Cuidadore,
        attributes: ["valorHora"],
      },
    ],
    order: [["dataHoraInicio", "ASC"]],
  });

  return await Promise.all(
    busca.map(async (ag) => {
      const data = ag.dataHoraInicio.toISOString().split("T")[0];
      let nome, observacoesMedicas, endereco, telefone;

      if (ag.idosoId) {
        const dados = await encontrarIdoso(ag.idosoId);
        nome = dados.nome;
        observacoesMedicas = dados.observacoesMedicas;
        endereco = dados.Contratante.User.endereco;
        telefone = dados.Contratante.User.telefone;
      } else {
        nome = ag.Contratante?.User?.nome;
        observacoesMedicas = ag.Contratante?.observacoesMedicas;
        endereco = ag.Contratante?.User?.endereco;
        telefone = ag.Contratante?.User?.telefone;
      }

      return {
        id: ag.id,
        nome,
        observacoesMedicas,
        endereco,
        telefone,
        valorHora: ag.Cuidadore?.valorHora,
        data,
        dataHoraInicio: ag.dataHoraInicio,
        dataHoraFim: ag.dataHoraFim,
        status: ag.status,
      };
    })
  );
}

async function agendamentosPendentesCuidador(cuidadorId) {
  const busca = await Agendamento.findAll({
    where: {
      [Op.and]: [{ cuidadorId }, { status: "pendente" }],
    },
    attributes: ["id", "idosoId", "dataHoraInicio", "dataHoraFim"],
    include: [
      {
        model: Contratantes,
        attributes: ["observacoesMedicas"],
        include: [
          {
            model: User,
            attributes: ["nome", "endereco"],
          },
        ],
      },
      {
        model: Cuidadore,
        attributes: ["valorHora"],
      },
    ],
    order: [["dataHoraInicio", "ASC"]],
  });

  return await Promise.all(
    busca.map(async (ag) => {
      const data = ag.dataHoraInicio.toISOString().split("T")[0];
      let nome, observacoesMedicas, endereco;

      if (ag.idosoId) {
        const dados = await encontrarIdoso(ag.idosoId);
        nome = dados.nome;
        observacoesMedicas = dados.observacoesMedicas;
        endereco = dados.Contratante.User.endereco;
      } else {
        nome = ag.Contratante?.User?.nome;
        observacoesMedicas = ag.Contratante?.observacoesMedicas;
        endereco = ag.Contratante?.User?.endereco;
      }

      return {
        id: ag.id,
        nome,
        observacoesMedicas,
        endereco,
        data,
        dataHoraInicio: ag.dataHoraInicio,
        dataHoraFim: ag.dataHoraFim,
      };
    })
  );
}

async function encontrarAgendamentoCuidadores(id) {
  return await Agendamento.findOne({
    where: { id },
    include: [
      {
        model: Cuidadore,
        attributes: [
          "id",
          "disponibilidade",
          "valorHora",
          "valorPeriodo",
          "especialidade",
        ],
        include: [{ model: User, attributes: ["id", "nome"] }],
      },
    ],
  });
}

async function encontrarAgendamentoContratantes(id) {
  return await Agendamento.findOne({
    where: { id },
    include: [
      {
        model: Contratantes,
        attributes: ["id", "necessidades"],
        include: [{ model: User, attributes: ["id", "nome", "endereco"] }],
      },
    ],
  });
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
    console.log(
      `Agendamento ${agendamento.id} foi removido por inatividade ou cancelamento antigo.`
    );
  }
}

cron.schedule("0 3 */2 * *", () => {
  limparAgendamentos();
});

async function listarServicosConcluidosCuidador(cuidadorId) {
  const agendamentos = await Agendamento.findAll({
    where: {
      cuidadorId,
      status: "concluido",
    },
    attributes: ["idosoId", "contratanteId", "dataHoraInicio", "dataHoraFim"],
    include: [
      {
        model: Contratantes,
        attributes: ["id"],
        include: [{ model: User, attributes: ["nome"] }],
      },
      {
        model: Idosos,
        attributes: ["nome"],
      },
      {
        model: Cuidadore,
        attributes: ["valorHora"],
      },
    ],
    order: [["dataHoraFim", "DESC"]],
  });

  return agendamentos.map((ag) => {
    let nomeCliente;

    if (!ag.contratanteId && ag.idosoId) {
      nomeCliente = ag.Idoso?.nome || "Idoso não identificado";
    } else {
      nomeCliente =
        ag.Contratante?.User?.nome || "Contratante não identificado";
    }

    return {
      nomeCliente,
      dataHoraExecucao: ag.dataHoraFim || ag.dataHoraInicio,
      valor: ag.Cuidadore?.valorHora || 0,
    };
  });
}

module.exports = {
  registrarAgendamento,
  aceitarAgendamento,
  concluirAgendamento,
  cancelarAgendamento,
  buscarAgendamentosContratante,
  buscarAgendamentosIdoso,
  buscarAgendamentosCuidador,
  agendamentosPendentesCuidador,
  encontrarAgendamentoCuidadores,
  encontrarAgendamentoContratantes,
  limparAgendamentos,
  listarServicosConcluidosCuidador,
};
