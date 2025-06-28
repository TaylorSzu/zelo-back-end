const express = require("express");
const Contratante = require("../Services/contratanteService.js");
const authMiddleware = require("../Jwt/middleware.js");

const router = express.Router();

router.post("/contratante/registrar", authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { idade, dataNascimento, observacoesMedicas } = req.body;
    const contratante = {
      usuarioId,
      idade,
      dataNascimento,
      observacoesMedicas,
    };
    if (Object.keys(contratante).length == 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }
    console.log("Recebendo dados para registrar:", contratante);
    await Contratante.registrarContratante(contratante);
    res.status(201).json({ msg: "Contratante registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar o contratante:", error);
    res.status(500).json({ msg: "Erro ao cadastrar o contratante" });
  }
});

router.get("/contratante/listar", authMiddleware, async (req, res) => {
  try {
    const users = await Contratante.listarContratante();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar os contratantes:", error);
    res.status(500).json({ msg: "Erro ao listar os contratantes" });
  }
});

router.put("/contratante/alterar/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioId = req.user.id;
    const { idade, dataNascimento, observacoesMedicas } = req.body;
    if (idade == null || dataNascimento == null || observacoesMedicas == null) {
      return res
        .status(400)
        .json({ msg: "Nenhum dado foi fornecido para atualizar" });
    }
    const user = { usuarioId, idade, dataNascimento, observacoesMedicas };
    console.log("Recebendo dados para alterar:", user);
    await Contratante.editarContratante(id, user);
    res.status(200).json({ msg: "Contratante alterado com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar o contratante:", error);
    res.status(500).json({ msg: "Erro ao alterar o contratante" });
  }
});

module.exports = router;
