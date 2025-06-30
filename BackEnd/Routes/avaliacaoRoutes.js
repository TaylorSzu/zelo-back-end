const express = require("express");
const router = express.Router();
const avaliacaoService = require("../Services/avaliacaoService.js");
const authMiddleware = require("../Jwt/middleware.js");
const Agendamento = require("../Models/agendamentoModel");

// Registrar avaliação
router.post("/avaliacao/registrar", authMiddleware, async (req, res) => {
  try {
    const dados = req.body;
    if (Object.keys(dados).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }

    // ⛔ Verifica se o agendamento já foi avaliado
    const jaAvaliado = await Agendamento.findOne({
      where: { id: dados.agendamentoId, avaliado: true },
    });
    if (jaAvaliado) {
      return res.status(400).json({ msg: "Este agendamento já foi avaliado." });
    }

    console.log("Recebendo dados para avaliação:", dados);

    await avaliacaoService.registrarAvaliacao(dados);

    // ✅ Marca o agendamento como avaliado
    await Agendamento.update(
      { avaliado: true },
      { where: { id: dados.agendamentoId } }
    );

    res.status(201).json({ msg: "Avaliação registrada com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar avaliação:", error);
    res
      .status(500)
      .json({ msg: "Erro ao registrar avaliação", error: error.message });
  }
});

// Buscar avaliações de um cuidador
router.get("/avaliacao/cuidador/:cuidadorId", async (req, res) => {
  try {
    const { cuidadorId } = req.params;
    const avaliacoes = await avaliacaoService.listarAvaliacoesPorCuidador(
      cuidadorId
    );
    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ msg: "Erro ao buscar avaliações" });
  }
});

router.put("/avaliacao/editar/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const usuarioId = req.user.id;

    if (Object.keys(dadosAtualizados).length === 0) {
      return res
        .status(400)
        .json({ msg: "Nenhum dado foi fornecido para atualização" });
    }

    const resultado = await avaliacaoService.editarAvaliacao(
      dadosAtualizados,
      id,
      usuarioId
    );

    if (!resultado) {
      return res.status(404).json({
        msg: "Avaliação não encontrada ou você não tem permissão para editar.",
      });
    }

    res.status(200).json({
      msg: "Avaliação atualizada com sucesso",
      novaMedia: resultado.mediaAtualizada,
    });
  } catch (error) {
    console.error("Erro ao editar avaliação:", error);
    res.status(500).json({ msg: "Erro ao editar avaliação" });
  }
});

// Buscar média de avaliações de um cuidador
router.get("/avaliacao/media/:cuidadorId", async (req, res) => {
  try {
    const { cuidadorId } = req.params;
    const media = await avaliacaoService.calcularMediaAvaliacao(cuidadorId);
    res.json({ media });
  } catch (error) {
    console.error("Erro ao calcular média:", error);
    res.status(500).json({ msg: "Erro ao calcular média" });
  }
});

module.exports = router;
