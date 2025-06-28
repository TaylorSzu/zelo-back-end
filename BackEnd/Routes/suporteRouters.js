const express = require("express");
const suporteService = require("../Services/suporteService.js");
const authMiddleware = require("../Jwt/middleware.js");

const router = express.Router();

// Rota para enviar suporte
router.post("/suporte/enviar", authMiddleware, async (req, res) => {
  try {
    const { userEmail, titulo, conteudo, userName } = req.body;
    if (Object.keys(userEmail).length == 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido" });
    }
    console.log("Recebendo dados para enviar suporte:", userEmail);
    await suporteService.enviarEmail(userEmail, titulo, conteudo, userName);
    res.status(201).json({ msg: "suporte registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar o suporte:", error);
    res.status(500).json({ msg: "Erro ao cadastrar o suporte" });
  }
});

module.exports = router;
