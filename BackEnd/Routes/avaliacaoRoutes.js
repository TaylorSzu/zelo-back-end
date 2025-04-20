const express = require("express");
const router = express.Router();
const avaliacaoService = require("../Services/avaliacaoService.js");
const authMiddleware = require("../Jwt/middleware.js");

router.post("/avaliacao/registrar", authMiddleware, async (req, res) => {
    try {
        const dados = req.body;
        if (Object.keys(dados).length === 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }

        console.log("Recebendo dados para avaliação:", dados);

        await avaliacaoService.registrarAvaliacao(dados);
        res.status(201).json({ "msg": "Avaliação registrada com sucesso" });

    } catch (error) {
        console.error("Erro ao registrar avaliação:", error);
        res.status(500).json({ "msg": "Erro ao registrar avaliação" });
    }
});

router.get("/avaliacao/listar", authMiddleware, async (req, res) => {
    try {
        const avaliacoes = await avaliacaoService.listarAvaliacao();
        res.status(200).json(avaliacoes);
    } catch (error) {
        console.error("Erro ao listar avaliações:", error);
        res.status(500).json({ "msg": "Erro ao listar avaliações" });
    }
});

router.delete("/avaliacao/excluir/:id", authMiddleware, async (req, res) => {
    try {
        const deletada = await avaliacaoService.excluirAvaliacao(req.params.id);
        if (!deletada) {
            return res.status(404).json({ "msg": "Avaliação não encontrada para exclusão" });
        }

        res.status(200).json({ "msg": "Avaliação excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir avaliação:", error);
        res.status(500).json({ "msg": "Erro ao excluir avaliação" });
    }
});
// Rota para média de avaliações de um cuidador específico
router.get("/avaliacoes/media/:cuidadorId", avaliacaoController.mediaAvaliacao);

module.exports = router;
