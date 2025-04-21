const express = require("express");
const router = express.Router();
const avaliacaoService = require("../Services/avaliacaoService.js");
const authMiddleware = require("../Jwt/middleware.js");

router.post("/avaliacao/registrar", authMiddleware, async (req, res) => {
  try {
    const dados = req.body;
    if (Object.keys(dados).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }

    console.log("Recebendo dados para avaliação:", dados);

    await avaliacaoService.registrarAvaliacao(dados);
    res.status(201).json({ msg: "Avaliação registrada com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar avaliação:", error);
    res.status(500).json({ msg: "Erro ao registrar avaliação" });
  }
});

router.put("/avaliacao/editar/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    const usuarioId = req.user.id;

    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido para atualização" });
    }

    const resultado = await avaliacaoService.editarAvaliacao(dadosAtualizados, id, usuarioId);

    if (!resultado) {
      return res.status(403).json({ msg: "Não autorizado ou avaliação inexistente" });
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


module.exports = router;
