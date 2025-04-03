import cuidador from "../Services/cuidadorService.js";
import express from "express";
import authMiddleware from "../Jwt/middleware.js";
import {gerarToken} from "../Jwt/jwt.js";
import database from "../Database/Database.js";
const router = express.Router();

router.post("/cuidador/registrar", async (req, res) => {
    try {
        const user = req.body;
        if(Object.keys(user).length == 0){
            return res.status(400).json({"msg": "Nenhum dado foi fornecido"});
        }
        console.log("Recebendo dados para registrar:", user);
        await database.sync().then(() => {
            return cuidador.registrarCuidador(user);
        })       
        res.status(201).json({"msg": "Cuidador registrado com sucesso"}); 
    } catch (error) {
        console.error("Error: erro ao cadastrar o cuidador",error);
        res.status(500).json({"msg": "Erro ao cadastrar o cuidador"});
    }
});

router.get("/cuidador/listar", authMiddleware, async (req, res) => {
    try {
        const users = await cuidador.listarCuidador();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: erro ao listar os cuidadores",error);
        res.status(500).json({"msg": "Erro ao listar os cuidadores"});
    }
});

export default router;