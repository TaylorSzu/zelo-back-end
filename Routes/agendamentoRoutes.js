const express = require('express');
const agendamento = require('../Services/agendamentoService');
const authMiddleware = require('../Jwt/middleware');

const router = express.Router();

// Registrar Agendamento
router.post("/agendamento/registrar", authMiddleware, async (req, res) => {
    try {
        const registrarAgendamento = req.body;
        if (Object.keys(registrarAgendamento).length === 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }
        console.log("Recebendo dados para registrar:", registrarAgendamento);
        await agendamento.registrarAgendamento(registrarAgendamento);
        res.status(201).json({ "msg": "Agendamento registrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar o agendamento:", error);
        res.status(500).json({ "msg": "Erro ao cadastrar o agendamento" });
    }
});

// Confirmar Agendamento
router.post("/agendamento/confirmar", authMiddleware, async (req, res) => {
    try {
        const { id } = req.body;
        const cuidadorId = req.user.id;
        if (!id) {
            return res.status(400).json({ "msg": "ID do agendamento não foi fornecido" });
        }

        await agendamento.aceitarAgendamento(id, cuidadorId);
        console.log("Agendamento confirmado:", id);

        res.json({ "msg": "Agendamento confirmado com sucesso" });
    } catch (error) {
        console.error("Erro ao confirmar o agendamento:", error);
        res.status(500).json({ "msg": "Erro ao confirmar o agendamento" });
    }
});

// Cancelar Agendamento
router.post("/agendamento/cancelar", authMiddleware, async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id; // Pegando o ID do usuário logado

        if (!id) {
            return res.status(400).json({ msg: "ID do agendamento não foi fornecido" });
        }

        const response = await agendamento.cancelarAgendamento(id, userId);
        res.json(response);
    } catch (error) {
        console.error("Erro ao cancelar o agendamento:", error);
        res.status(500).json({ msg: error.message || "Erro ao cancelar o agendamento" });
    }
});

// Limpar Agendamentos Pendente Há Mais de 2 Dias
router.delete("/agendamento/limpar", authMiddleware, async (req, res) => {
    try {
        await agendamento.limparAgendamentos();
        console.log("Agendamentos pendentes removidos automaticamente.");
        res.json({ "msg": "Agendamentos pendentes há mais de 2 dias foram removidos." });
    } catch (error) {
        console.error("Erro ao limpar agendamentos:", error);
        res.status(500).json({ "msg": "Erro ao limpar agendamentos" });
    }
});

module.exports = router;
