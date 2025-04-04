const express = require("express");
const usuario = require("../Services/userServices.js");
const authMiddleware = require("../Jwt/middleware.js");
const { gerarToken } = require("../Jwt/jwt.js");
const cookieParser = require("cookie-parser");
const database = require("../Database/Database.js");

const router = express.Router();
router.use(cookieParser());

router.post("/usuario/registrar", async (req, res) => {
    try {
        const user = req.body;
        if (Object.keys(user).length == 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }
        console.log("Recebendo dados para registrar:", user);
        await database.sync().then(() => {
            return usuario.registrarUsuario(user);
        });
        res.status(201).json({ "msg": "Usuario registrado com sucesso" });
    } catch (error) {
        console.error("Error: erro ao cadastrar o usuario", error);
        res.status(500).json({ "msg": "Erro ao cadastrar o usuario" });
    }
});

router.post("/usuario/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (email == null || senha == null) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        }
        const user = await usuario.login(email, senha);
        database.sync().then(() => {
            if (usuario.login(email, senha) == null) {
                return res.status(404).json({ "msg": "Usuario nao encontrado" });
            }
        });
        if (user == null) {
            return res.status(404).json({ "msg": "Usuario nao encontrado" });
        }
        const token = gerarToken(user.id);

        res.cookie("token", token);
        res.status(200).json({ "token": token });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ "msg": "Erro ao realizar login" });
    }
});

router.post("/usuario/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ "msg": "Logout realizado com sucesso" });
});

router.get("/usuario/listar", authMiddleware, async (req, res) => {
    try {
        const users = await usuario.listarUsuarios();
        if (users == null) {
            res.status(404).json({ "msg": "Usuarios nao encontrados" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: erro ao listar os usuarios", error);
        res.status(500).json({ "msg": "Erro ao listar os usuarios" });
    }
});

router.get("/usuario/encontrar", authMiddleware, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await usuario.encontrarUsuario(id);
        if (user == null) {
            return res.status(404).json({ "msg": "Usuario nao encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error: erro ao encontrar o usuario", error);
        res.status(500).json({ "msg": "Erro ao encontrar o usuario" });
    }
});

router.put("/usuario/alterar/:id", authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if (Object.keys(user).length == 0) {
            return res.status(400).json({ "msg": "Nenhum dado foi fornecido" });
        } else if (user.id == null) {
            return res.status(400).json({ "msg": "Nenhum id foi fornecido" });
        }
        console.log("Recebendo dados para alterar:", user);
        await usuario.editarUsuario(id, user);
        res.status(200).json({ "msg": "Usuario alterado com sucesso" });
    } catch (error) {
        console.error("Error: erro ao alterar o usuario", error);
        res.status(500).json({ "msg": "Erro ao alterar o usuario" });
    }
});

router.delete("/usuario/excluir", authMiddleware, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await usuario.excluirUsuario(id);
        if (!user) {
            return res.status(404).json({ "msg": "Usuário não encontrado" });
        }
        res.status(200).json({ "msg": "Usuario excluido com sucesso" });
    } catch (error) {
        console.error("Error: erro ao excluir o usuario", error);
        res.status(500).json({ "msg": "Erro ao excluir o usuario" });
    }
});

module.exports = router;
