const express = require("express");
const cuidador = require("../Services/cuidadorService.js");
const authMiddleware = require("../Jwt/middleware.js");
const { gerarToken } = require("../Jwt/jwt.js");
const database = require("../Database/Database.js");

const router = express.Router();

router.post("/cuidador/registrar", async (req, res) => {
    try {
        const user = req.body;
        if (Object.keys(user).length == 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }
        console.log("Recebendo dados para registrar:", user);
        await database.sync().then(() => {
            return cuidador.registrarCuidador(user);
        });
        res.status(201).json({ "msg": "Cuidador registrado com sucesso" });
    } catch (error) {
        console.error("Error: erro ao cadastrar o cuidador", error);
        res.status(500).json({ "msg": "Erro ao cadastrar o cuidador" });
    }
});

router.get("/cuidador/listar", authMiddleware, async (req, res) => {
    try {
        const users = await cuidador.listarCuidador();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: erro ao listar os cuidadores", error);
        res.status(500).json({ "msg": "Erro ao listar os cuidadores" });
    }
});

router.get("/cuidador/encontrar/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(401).json({"msg": "Id vazio"});
        } 
        const cuidadorEncontrado = await cuidador.encontrarCuidador(id);
        res.status(200).json(cuidadorEncontrado);
    } catch (error) {
        console.error("Error: erro ao encontrar o cuidador", error); 
    }
});

module.exports = router;