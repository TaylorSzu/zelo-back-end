const express = require("express");
const agendamento = require("../Services/agendamentoService");
const authMiddleware = require("../Jwt/middleware");

const router = express.Router();

// Registrar Agendamento
router.post("/agendamento/registrar", authMiddleware, async (req, res) => {
  try {
    const registrarAgendamento = req.body;
    if (Object.keys(registrarAgendamento).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }
    console.log("Recebendo dados para registrar:", registrarAgendamento);
    await agendamento.registrarAgendamento(registrarAgendamento);
    res.status(201).json({ msg: "Agendamento registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar o agendamento:", error);
    res.status(500).json({ msg: "Erro ao cadastrar o agendamento" });
  }
});

router.get(
  "/agendamento/listar/contratante/:contratanteId",
  authMiddleware,
  async (req, res) => {
    try {
      const contratanteId = req.params.contratanteId;
      const agendamentoContratante =
        await agendamento.buscarAgendamentosContratante(contratanteId);
      res.status(200).json(agendamentoContratante);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

router.get(
  "/agendamento/listar/cuidador/:cuidadorId",
  authMiddleware,
  async (req, res) => {
    try {
      const { cuidadorId } = req.params;
      const agendamentoCuidador = await agendamento.buscarAgendamentosCuidador(
        cuidadorId
      );
      res.status(200).json(agendamentoCuidador);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

router.get(
  "/agendamento/listar/idoso/:contratanteId",
  authMiddleware,
  async (req, res) => {
    try {
      const id = req.params.contratanteId;
      const agendamentosIdoso = await agendamento.buscarAgendamentosIdoso(id);
      res.status(200).json(agendamentosIdoso);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

router.get(
  "/agendamento/listar/pendente/cuidador/:cuidadorId",
  authMiddleware,
  async (req, res) => {
    try {
      const cuidadorId = req.params.cuidadorId;
      const agendamentosPendentes =
        await agendamento.agendamentosPendentesCuidador(cuidadorId);
      res.status(200).json(agendamentosPendentes);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

//rapaz eu que eu não vou usar isso por enquanto
router.post(
  "/agendamento/encontrar/cuidador",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.body;
      const agendamentoCuidador =
        await agendamento.encontrarAgendamentoCuidadores(id);
      res.status(200).json(agendamentoCuidador);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

router.post(
  "/agendamento/encontrar/contratante",
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.body;
      const agendamentoContratante =
        await agendamento.encontrarAgendamentoContratantes(id);
      res.status(200).json(agendamentoContratante);
    } catch (error) {
      console.error("Error: erro ao listar", error);
      res.status(500).json({ msg: "Error ao listar agendamentos do cuidador" });
    }
  }
);

// Confirmar Agendamento
router.put("/agendamento/confirmar", authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const { cuidadorId } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ msg: "ID do agendamento não foi fornecido" });
    }
    const dados = await agendamento.aceitarAgendamento(id, cuidadorId);
    console.log("Agendamento confirmado:", id);

    res.json({ msg: "Agendamento confirmado com sucesso", dados });
  } catch (error) {
    console.error("Erro ao confirmar o agendamento:", error);
    res.status(500).json({ msg: "Erro ao confirmar o agendamento" });
  }
});

router.put("/agendamento/concluido", authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const { cuidadorId } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ msg: "ID do agendamento não foi fornecido" });
    }
    const dados = await agendamento.concluirAgendamento(id, cuidadorId);
    console.log("Agendamento confirmado:", id);

    res.json({ msg: "Agendamento confirmado com sucesso", dados });
  } catch (error) {
    console.error("Erro ao confirmar o agendamento:", error);
    res.status(500).json({ msg: "Erro ao confirmar o agendamento" });
  }
});

// Cancelar Agendamento
router.put("/agendamento/cancelar", authMiddleware, async (req, res) => {
  try {
    const { id, contratanteId, cuidadorId } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ msg: "ID do agendamento não foi fornecido" });
    }

    if (!contratanteId && !cuidadorId) {
      return res
        .status(400)
        .json({ msg: "É necessário informar o contratanteId ou o cuidadorId" });
    }

    const response = await agendamento.cancelarAgendamento(
      id,
      contratanteId || null,
      cuidadorId || null
    );

    res.json(response);
  } catch (error) {
    console.error("Erro ao cancelar o agendamento:", error);
    res
      .status(500)
      .json({ msg: error.message || "Erro ao cancelar o agendamento" });
  }
});

// Limpar Agendamentos Pendente Há Mais de 2 Dias
router.delete("/agendamento/limpar", authMiddleware, async (req, res) => {
  try {
    await agendamento.limparAgendamentos();
    console.log("Agendamentos pendentes removidos automaticamente.");
    res.json({
      msg: "Agendamentos pendentes há mais de 2 dias foram removidos.",
    });
  } catch (error) {
    console.error("Erro ao limpar agendamentos:", error);
    res.status(500).json({ msg: "Erro ao limpar agendamentos" });
  }
});

router.get(
  "/servicos/concluidos/:cuidadorId",
  authMiddleware,
  async (req, res) => {
    try {
      const cuidadorId = req.params.cuidadorId;
      const servicos =
        await agendamento.listarServicosConcluidosCuidador(cuidadorId);
      res.status(200).json(servicos);
    } catch (error) {
      console.error("Erro ao listar serviços concluídos", error);
      res.status(500).json({ msg: "Erro ao listar serviços concluídos" });
    }
  }
);

module.exports = router;
