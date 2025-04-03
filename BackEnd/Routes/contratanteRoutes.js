import Contratante from "../Services/contratanteService.js";
import express from "express";
import authMiddleware from "../Jwt/middleware.js";

const router = express.Router();

router.post("/contratante/registrar", authMiddleware, async (req, res) => {
    try {
        const user = req.body;
        if(Object.keys(user).length == 0){
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

export default router;