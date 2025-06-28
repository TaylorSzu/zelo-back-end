const Pagamento = require("./pagamentoModel.js");
const bankAPI = require("./mercadoPago.js");
const { devolucao } = require('./mercadoPago.js');
const Cuidadores = require("../Models/cuidadorModel.js");
const Agendamento = require("../Models/agendamentoModel.js");
const Contratantes = require("../Models/contratanteModel.js");
const User = require("../Models/userModel.js");
// const { aceitarAgendamento } = require("../Services/agendamentoService.js");
const express = require("express");
const Usuario = require("../Models/userModel.js");

async function registrarPagamento(pagar) {
  const cuidador = await Cuidadores.findOne({
    where: { id: pagar.cuidadorId },
  });
  const contratante = await Contratantes.findOne({
    where: { id: pagar.contratanteId },
  });
  const agendamento = await Agendamento.findOne({
    where: { id: pagar.agendamentoId },
  });
  if (!cuidador) {
    throw new Error("Cuidador não encontrado.");

  } else if (!contratante) {
    throw new Error("Contratante não encontrado.");

  } else if (!agendamento) {
    throw new Error("Agendamento não encontrado.");

  } else if (agendamento.status === "confirmado" || agendamento.status === "Confirmado") {
    console.log("Agendamento está concluido, realizando sistema de pagamento");

  } else {
    throw new Error("Agendamento está pendente")
  }

  return Pagamento.create(pagar);
}

async function listarPagamentoContratante(contratanteId) {
  try {
    console.log("Associações de Pagamento:", Object.keys(Pagamento.associations));
    //Aqui é o pendente
    const pagamentosPendentes = await Pagamento.findAll({
      where: {
        contratanteId,
        status: "Pendente"
      },
      include: [
        {
          model: Contratantes,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Cuidadores,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Agendamento,
          attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
        }
      ],
      attributes: ['id', 'status', 'valorHora', 'linkPagCT', 'dataGeral', 'createdAt', 'updatedAt']
    });

    //Esse é caso cancelou
    const pagamentosCancelados = await Pagamento.findAll({
      where: {
        contratanteId,
        status: "Cancelado"
      },
      include: [
        {
          model: Contratantes,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Cuidadores,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Agendamento,
          attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
        }
      ],
      attributes: ['id', 'status', 'valorHora', 'dataGeral', 'motivo', 'createdAt', 'updatedAt']
    });

    //Esse é se ele pagou
    const pagamentosPagos = await Pagamento.findAll({
      where: {
        contratanteId,
        status: "Pago"
      },
      include: [
        {
          model: Contratantes,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Cuidadores,
          attributes: ['id', 'usuarioId'],
          include: [
            {
              model: User,
              attributes: ['nome']
            }
          ]
        },
        {
          model: Agendamento,
          attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
        }
      ],
      attributes: ['id', 'status', 'valorHora', 'dataGeral', 'metodo', 'createdAt', 'updatedAt']
    });

    //Por favor, colegas, se for mexer, recapitule umas 10 vezes
    return {
      pendentes: pagamentosPendentes.map(pagamento => ({
        id: pagamento.id,
        contratanteNome: pagamento.Contratante && pagamento.Contratante.User ? pagamento.Contratante.User.nome : null,
        cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
        status: pagamento.status,
        valor: pagamento.valorHora,
        periodo: pagamento.Agendamento ?
          {
            inicio: pagamento.Agendamento.dataHoraInicio,
            fim: pagamento.Agendamento.dataHoraFim
          } : null,
        vencimento: pagamento.Agendamento.dataHoraFim,
        link: pagamento.linkPagCT,
        dataCriada: pagamento.createdAt
      })),
      cancelados: pagamentosCancelados.map(pagamento => ({
        id: pagamento.id,
        contratanteNome: pagamento.Contratante && pagamento.Contratante.User ? pagamento.Contratante.User.nome : null,
        cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
        status: pagamento.status,
        valor: pagamento.valorHora,
        motivo: pagamento.motivo,
        dataCancel: pagamento.updatedAt,
      })),
      concluidos: pagamentosPagos.map(pagamento => ({
        id: pagamento.id,
        contratanteNome: pagamento.Contratante && pagamento.Contratante.User ? pagamento.Contratante.User.nome : null,
        cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
        status: pagamento.status,
        valor: pagamento.valorHora,
        metodo: pagamento.metodo,
        dataRealizada: pagamento.updatedAt,
      })),
    };
  } catch (error) {
    throw new Error("Erro em listar: " + error);
  }


}

//Não mexa por favor...
async function listarPagamentoCuidador(cuidadorId) {
  const pagamentosPendentes = await Pagamento.findAll({
    where: {
      cuidadorId,
      status: "Pendente"
    },
    include: [
      {
        model: Cuidadores,
        attributes: ['id', 'usuarioId'],
        include: [
          {
            model: User,
            attributes: ['nome']
          }
        ]
      },
      {
        model: Agendamento,
        attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
      },
    ],
    attributes: ['id', 'createdAt', 'updatedAt', 'status', 'valorHora', 'dataGeral'],
  });

  const pagamentosConcluidos = await Pagamento.findAll({
    where: {
      cuidadorId,
      status: "Pago"
    },
    include: [
      {
        model: Cuidadores,
        attributes: ['id', 'usuarioId'],
        include: [
          {
            model: User,
            attributes: ['nome']
          }
        ]
      },
      {
        model: Agendamento,
        attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
      },
    ],
    attributes: ['id', 'createdAt','updatedAt', 'status', 'valorHora', 'dataGeral'],
  });

  const pagamentosCancelados = await Pagamento.findAll({
    where: {
      cuidadorId,
      status: "Cancelado"
    },
    include: [
      {
        model: Cuidadores,
        attributes: ['id', 'usuarioId'],
        include: [
          {
            model: User,
            attributes: ['nome']
          }
        ]
      },
      {
        model: Agendamento,
        attributes: ['id', 'dataHoraInicio', 'dataHoraFim'],
      },
    ],
    attributes: ['id', 'createdAt', 'updatedAt', 'status', 'valorHora', 'dataGeral'],
  });

  return {
    pendentes: pagamentosPendentes.map(pagamento => ({
      id: pagamento.id,
      cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
      status: pagamento.status,
      periodo: pagamento.Agendamento ?
        {
          inicio: pagamento.Agendamento.dataHoraInicio,
          fim: pagamento.Agendamento.dataHoraFim
        } : null,
      vencimento: pagamento.Agendamento.dataHoraFim,
      banco: pagamento.banco || null
    })),
    concluidos: pagamentosConcluidos.map(pagamento => ({
      id: pagamento.id,
      cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
      status: pagamento.status,
      vencimento: pagamento.Agendamento.dataHoraFim,
      banco: pagamento.banco || null,
      valor: pagamento.valorHora,
      metodo: pagamento.metodo,
      dataRealizada: pagamento.updatedAt,
    })),
    cancelados: pagamentosCancelados.map(pagamento => ({
      id: pagamento.id,
      cuidadorNome: pagamento.Cuidadore && pagamento.Cuidadore.User ? pagamento.Cuidadore.User.nome : null,
      status: pagamento.status,
      vencimento: pagamento.Agendamento.dataHoraFim,
      banco: pagamento.banco || null,
      valor: pagamento.valorHora,
      motivo: pagamento.motivo,
      dataCancel: pagamento.updatedAt,
    }))
  };
}

//Aqui pode mexer
async function devolucaoPagamento(paymentId) {
  try {
    const pagamento = await Pagamento.findByPk(paymentId);
    const agendamento = await Agendamento.findOne({
      where: { id: pagamento.agendamentoId },
    });
    if (!pagamento) {
      throw new Error("Pagamento não encontrado.");
    } else if (!pagamento.id) {
      throw new Error("Id do Mercado Pago não encontrado neste pagamento.");
    } else if (agendamento.status === "confirmado" || agendamento.status === "Confirmado") {
      console.log("Agendamento deve ser confirmado para devolução");
    }

    await devolucao.create({ payment_id: pagamento.paymentId })
    pagamento.status = "Devolvido";
    await pagamento.save();
    return pagamento;

  } catch (error) {
    throw new Error("Erro ao solicitar devolução no Mercado Pago: " + error.message);
  }


}

module.exports = {
  registrarPagamento,
  listarPagamentoContratante,
  listarPagamentoCuidador,
  devolucaoPagamento
};
