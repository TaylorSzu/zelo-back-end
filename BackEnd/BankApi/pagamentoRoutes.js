const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { bankAPI } = require("./mercadoPago.js");
const { Preference } = require("mercadopago");
const authMiddleware = require("../Jwt/middleware.js");
const bankService = require("./pagamentoService.js");
const Cuidadores = require("../Models/cuidadorModel.js");
const Pagamento = require("./pagamentoModel.js");
const User = require("../Models/userModel.js");
const Contratante = require("../Models/contratanteModel.js")
const pagamentoService = require("./pagamentoService.js");
const axios = require('axios');

//Registrar Pagamento
router.post("/pagamento/contratante/registrar", authMiddleware, async (req, res) => {
  try {
    const {
      cuidadorId,
      contratanteId,
      agendamentoId,
    } = req.body;

    const cuidador = await Cuidadores.findOne({
      where: { id: cuidadorId },
      attributes: ["valorHora"]
    });
    const nameCuidador = await Cuidadores.findOne({
      where: { id: cuidadorId },
      attributes: ["id", "usuarioId"],
      include: [
        {
          model: User,
          attributes: ["nome"]
        }
      ]
    });
    const nameContratante = await Contratante.findOne({
      where: { id: contratanteId },
      attributes: ["id", "usuarioId"],
      include: [
        {
          model: User,
          attributes: ["nome"]
        }
      ]
    });
    if (!cuidador) {
      console.log(cuidador)
      return res.status(404).json({ error: "Cuidador não encontrado" });
    }

    const valorHora = cuidador.valorHora;
    const cuidador_nome = nameCuidador.User ? nameCuidador.User.nome : null;
    const contratante_nome = nameContratante.User ? nameContratante.User.nome : null;

    if (!cuidador_nome || !contratante_nome) {
      return res.status(404).json({ error: "Nome do cuidador ou contratante não encontrado" });
    }

    const preference = await new Preference(bankAPI).create({
      body: {
        items: [
          {
            title: `Serviço de ${cuidador_nome} para ${contratante_nome}, entrando na conta zEllo`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(valorHora),
          },
        ],
        back_urls: {
          success: "http://localhost:5171/sucesso",
          failure: "http://localhost:5171/falha",
          pending: "http://localhost:5171/pendente",
        },
        payment_methods: {
          excluded_payment_types: [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "ticket" },
          ]
        },
        metadata: {
          cuidadorId: Number(cuidadorId),
          contratanteId: Number(contratanteId),
          agendamentoId: Number(agendamentoId),
        },
        //Se ativar essa coisa aqui, a rota inteira vai de offline
        //  notification_url: "http://localhost:5171/pagamento/notificacao",
      },
    });
    const pagar = {
      valorHora,
      contratante_nome,
      cuidador_nome,
      cuidadorId,
      contratanteId,
      agendamentoId,
      preferenceId: preference.id,
      linkPagCT: preference.sandbox_init_point
    };
    await bankService.registrarPagamento(pagar);
    res.json({
      preferenceId: preference.id,
      initPoint: preference.sandbox_init_point
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error.response?.data || error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

router.post("/pagamento/notificacao", async (req, res) => {
  try {
    const paymentId = req.body.data?.id || req.query['data.id'];
    if (!paymentId) return res.sendStatus(400);

    
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer 
    "APP_USR-7755870513264090-062218-753b189aae8d8238965b1f4291ddb849-1214525747`,
        },
      }
    );
    const pagamentoMP = response.data;

    
    await Pagamento.update(
      { paymentId: pagamentoMP.id, status: pagamentoMP.status === "approved" ? "Pago" : pagamentoMP.status },
      { where: { preferenceId: pagamentoMP.order.id } }
    );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Liberação do Cuidador Receber o dinheiro
router.post("/pagamento/cuidador/liberar/:id", authMiddleware, async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);
    const {
      agendamentoId,
      contratanteId,
      cuidadorId
    } = req.body;

    const cuidador = await Cuidadores.findOne({
      where: { id: cuidadorId },
      attributes: ["valorHora"]
    });
    const dadosCuidador = await Cuidadores.findOne({
      where: { id: cuidadorId },
      attributes: ["id", "usuarioId"],
      include: [
        {
          model: User,
          attributes: ["nome"]
        }
      ]
    });
    const dadosContratante = await Contratante.findOne({
      where: { id: contratanteId },
      attributes: ["id", "usuarioId"],
      include: [
        {
          model: User,
          attributes: ["nome"]
        }
      ]
    });
    if (!cuidador) {
      console.log(cuidador)
      return res.status(404).json({ error: "Cuidador não encontrado" });
    }

    const valorHora = cuidador.valorHora;
    const cuidador_nome = dadosCuidador.User ? dadosCuidador.User.nome : null;
    const contratante_nome = dadosContratante.User ? dadosContratante.User.nome : null;

    if (!cuidador_nome || !contratante_nome) {
      return res.status(404).json({ error: "Cuidador ou contratante não encontrado" });
    }

    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
    if (pagamento.status === "Pago") {
      return res.status(400).json({ error: "Pagamento já aprovado" });
    }

    const valorLiquido = valorHora * 0.85;

    const preference = await new Preference(bankAPI).create({
      body: {
        items: [
          {
            title: `Serviço de ${cuidador_nome} para ${contratante_nome}. Liberação do dinheiro.`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(valorLiquido),
          },
        ],
        back_urls: {
          success: "http://localhost:5171/sucesso",
          failure: "http://localhost:5171/falha",
          pending: "http://localhost:5171/pendente",
        },
                
        payment_methods: {
          excluded_payment_types: [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "ticket" },
          ]
        },
        metadata: {
          cuidadorId: Number(cuidadorId),
          contratanteId: Number(contratanteId),
          agendamentoId: Number(agendamentoId),
        },
        //Se ativar essa coisa aqui, a rota inteira vai de offline
        // notification_url: "http://localhost:5171/pagamento/notificacao",
      },
    });
    const pagar = {
      valorHora,
      contratante_nome,
      cuidador_nome,
      cuidadorId,
      contratanteId,
      agendamentoId,
      preferenceId: preference.id,
      linkPagCD: preference.sandbox_init_point
    };
    await bankService.registrarPagamento(pagar);
    res.json({
      preferenceId: preference.id,
      initPoint: preference.sandbox_init_point
    });

    pagamento.status = "Pago";
    await pagamento.save();

    res.json({
      message: "Pagamento liberado ao cuidador com sucesso!",
      valorTransferido: valorLiquido,
      taxa: pagamento.valorHora * 0.15
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao liberar pagamento ao cuidador." });
  }
});

//Listar pelo Contratante
router.get("/pagamentos/listarPagamentoContratante/:contratanteId", authMiddleware, async (req, res) => {
  try {
    const { contratanteId } = req.params;
    const pagamentosContratante = await pagamentoService.listarPagamentoContratante(contratanteId);
    res.json(pagamentosContratante);
  } catch (error) {
    res.status(404).json({ error: "Deu erro ao listar pagamentos." });
  }
});

//Listar pelo Cuidador
router.get("/pagamentos/listarPagamentoCuidador/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const pagamentosCuidador = await pagamentoService.listarPagamentoCuidador(id);
    res.json(pagamentosCuidador);
  } catch (error) {
    res.status(404).json({ error: "Deu erro ao listar pagamentos." });
  }
});

router.post("/pagamento/devolver/:paymentId", authMiddleware, async (req, res) => {
  try {
    const { paymentId } = await pagamentoService.devolucaoPagamento(req.params.paymentId);
    res.json({ message: "Pagamento devolvido com sucesso!", paymentId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
