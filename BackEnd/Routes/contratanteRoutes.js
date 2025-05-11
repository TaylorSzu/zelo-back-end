const express = require("express");
const Contratante = require("../Services/contratanteService.js");
const authMiddleware = require("../Jwt/middleware.js");

const router = express.Router();

router.post("/contratante/registrar", authMiddleware, async (req, res) => {
    try {
        const user = req.body;
        if (Object.keys(user).length == 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }
        console.log("Recebendo dados para registrar:", user);
        await Contratante.registrarContratante(user);
        res.status(201).json({ "msg": "Contratante registrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar o contratante:", error);
        res.status(500).json({ "msg": "Erro ao cadastrar o contratante" });
    }
});

router.get("/contratante/listar", authMiddleware, async (req, res) => {
    try {
        const users = await Contratante.listarContratante();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao listar os contratantes:", error);
        res.status(500).json({ "msg": "Erro ao listar os contratantes" });
    }
});

router.put("/contratante/alterar/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if (Object.keys(user).length == 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        } else if (user.id == null) {
            return res.status(400).json({ "msg": "Nenhum id foi fornecido" });
        }
        console.log("Recebendo dados para alterar:", user);
        await Contratante.editarContratante(id, user);
        res.status(200).json({ "msg": "Contratante alterado com sucesso" });
    } catch (error) {
        console.error("Error: erro ao alterar o contratante", error);
        res.status(500).json({ "msg": "Erro ao alterar o contratante" });
    }
});

module.exports = router;
