const express = require("express");
const Idoso = require("../Services/idosoService.js");
const authMiddleware = require("../Jwt/middleware.js");

const router = express.Router();

// Rota para cadastrar idoso
router.post("/idoso/registrar", authMiddleware, async (req, res) => {
  try {
    const idoso = req.body;
    if (Object.keys(idoso).length == 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }
    console.log("Recebendo dados para registrar idoso:", idoso);
    await Idoso.registrarIdoso(idoso);
    res.status(201).json({ msg: "Idoso registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar o idoso:", error);
    res.status(500).json({ msg: "Erro ao cadastrar o idoso" });
  }
});

// Rota para listar todos os idosos
router.get("/idoso/listar", authMiddleware, async (req, res) => {
  try {
    const idosos = await Idoso.listarIdoso();
    res.status(200).json(idosos);
  } catch (error) {
    console.error("Erro ao listar os idosos:", error);
    res.status(500).json({ msg: "Erro ao listar os idosos" });
  }
});

// Rota para buscar um idoso pelo ID
router.get("/idoso/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const idoso = await Idoso.encontrarIdoso(id);
    if (!idoso) {
      return res.status(404).json({ msg: "Idoso não encontrado" });
    }
    res.status(200).json(idoso);
  } catch (error) {
    console.error("Erro ao buscar idoso:", error);
    res.status(500).json({ msg: "Erro ao buscar o idoso" });
  }
});

// Rota para editar um idoso pelo ID
router.put("/idoso/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const idosoData = req.body;

  try {
    const idosoAtualizado = await Idoso.editarIdoso(id, idosoData);
    if (!idosoAtualizado) {
      return res.status(404).json({ msg: "Idoso não encontrado" });
    }
    res.status(200).json(idosoAtualizado);
  } catch (error) {
    console.error("Erro ao editar o idoso:", error);
    res.status(500).json({ msg: "Erro ao editar o idoso" });
  }
});

// Rota para excluir um idoso pelo ID
router.delete("/idoso/excluir/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const idosoExcluido = await Idoso.excluirIdoso(id);
    if (!idosoExcluido) {
      return res.status(404).json({ msg: "Idoso não encontrado" });
    }
    res.status(200).json({ msg: "Idoso excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o idoso:", error);
    res.status(500).json({ msg: "Erro ao excluir o idoso" });
  }
});

module.exports = router;
