import usuario from "../Services/userServices.js";
import express from "express";

const router = express.Router();

router.post("/usuario/registrar", async (req, res) => {
    try {
        const user = req.body;
        if(Object.keys(user).length == 0){
            return res.status(400).json({"msg": "Nenhum dado foi fornecido"});
        }
        console.log("Recebendo dados para registrar:", user);
        await usuario.registrarUsuario(user);
        res.status(201).json({"msg": "Usuario registrado com sucesso"});
    } catch (error) {
        console.error("Error: erro ao cadastrar o usuario",error);
        res.status(500).json({"msg": "Erro ao cadastrar o usuario"});
    }
});

router.get("/usuario/listar", async (req, res) => {
    try {
        const users = await usuario.listarUsuarios();
        if(users == null){
            res.status(404).json({"msg": "Usuarios nao encontrados"});
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: erro ao listar os usuarios",error);
        res.status(500).json({"msg": "Erro ao listar os usuarios"});
    }
});

router.get("/usuario/encontrar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await usuario.encontrarUsuario(id);
        if(user == null){
            return res.status(404).json({"msg": "Usuario nao encontrado"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error: erro ao encontrar o usuario",error);
        res.status(500).json({"msg": "Erro ao encontrar o usuario"});
    }
});

router.put("/usuario/alterar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if(Object.keys(user).length == 0){
            return res.status(400).json({"msg": "Nenhum dado foi fornecido"});
        }else if(user.id == null){
            return res.status(400).json({"msg": "Nenhum id foi fornecido"});
        }
        console.log("Recebendo dados para alterar:", user);
        await usuario.editarUsuario(id, user);
        res.status(200).json({"msg": "Usuario alterado com sucesso"});
    } catch (error) {
        console.error("Error: erro ao alterar o usuario",error);
        res.status(500).json({"msg": "Erro ao alterar o usuario"});
    }
});

router.delete("/usuario/excluir/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await usuario.excluirUsuario(id);
        res.status(200).json({"msg": "Usuario excluido com sucesso"});
    } catch (error) {
        console.error("Error: erro ao excluir o usuario",error);
        res.status(500).json({"msg": "Erro ao excluir o usuario"});
    }
});

export default router;