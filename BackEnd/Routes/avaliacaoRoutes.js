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

// Buscar avaliação por ID
router.get("/avaliacao/:id", authMiddleware, async (req, res) => {
    try {
        const avaliacao = await avaliacaoService.encontrarAvaliacao(req.params.id);
        if (!avaliacao) {
            return res.status(404).json({ "msg": "Avaliação não encontrada" });
        }
        res.status(200).json(avaliacao);
    } catch (error) {
        console.error("Erro ao buscar avaliação:", error);
        res.status(500).json({ "msg": "Erro ao buscar avaliação" });
    }
});

router.put("/avaliacao/editar/:id", authMiddleware, async (req, res) => {
    try {
        const dados = req.body;
        if (Object.keys(dados).length === 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido para atualização" });
        }

        const atualizada = await avaliacaoService.editarAvaliacao(req.params.id, dados);
        if (!atualizada) {
            return res.status(404).json({ "msg": "Avaliação não encontrada para editar" });
        }

        res.status(200).json({ "msg": "Avaliação atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao editar avaliação:", error);
        res.status(500).json({ "msg": "Erro ao editar avaliação" });
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

module.exports = router;
