const express = require("express");
const usuario = require("../Services/userServices.js");
const authMiddleware = require("../Jwt/middleware.js");
const { gerarToken } = require("../Jwt/jwt.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); // ✅ Importação corrigida aqui
const {
  enviarEmailRecuperacao,
} = require("../Services/emailRecuperacaoService.js");
const util = require("../Util/util.js");

const router = express.Router();
router.use(cookieParser());

// Registrar novo usuário
router.post("/usuario/registrar", async (req, res) => {
  try {
    const user = req.body;
    if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido." });
    }

    console.log("Recebendo dados para registrar:", user);
    const novoUsuario = await usuario.registrarUsuario(user);
    res
      .status(201)
      .json({ msg: "Usuário registrado com sucesso", novoUsuario });
  } catch (error) {
    console.error("Erro ao cadastrar o usuário:", error);
    res.status(500).json({ msg: "Erro ao cadastrar o usuário." });
  }
});

// Login
router.post("/usuario/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios." });
    }

    const resultado = await usuario.login(email, senha);

    if (!resultado.success) {
      return res.status(401).json({ msg: resultado.message });
    }
    const token = gerarToken(
      resultado.user.id,
      resultado.user.tipoUsuario,
      resultado.user.contratanteId,
      resultado.user.cuidadorId
    );
    res.cookie("token", token);

    res.status(200).json({
      token: token,
      usuario: resultado.user, // envia o usuário completo para o frontend acessar tipoUsuario
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ msg: "Erro ao realizar login." });
  }
});

// Logout
router.post("/usuario/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logout realizado com sucesso." });
});

// Listar usuários (com autenticação)
router.get("/usuario/listar", authMiddleware, async (req, res) => {
  try {
    const users = await usuario.listarUsuarios();
    if (!users) {
      return res.status(404).json({ msg: "Usuários não encontrados." });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar os usuários:", error);
    res.status(500).json({ msg: "Erro ao listar os usuários." });
  }
});

// Encontrar usuário pelo ID (com autenticação)
router.get("/usuario/encontrar", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await usuario.encontrarUsuario(id);
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado." });

    // Retorna nome junto com outros dados
    res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
      telefone: user.telefone,
      endereco: user.endereco,
      foto: user.foto,
      status: user.status,
      tipoUsuario: user.tipoUsuario,
      Cuidadores: user.Cuidadores,
      Contratantes: user.Contratantes,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao encontrar usuário." });
  }
});

// Alterar dados do usuário (com autenticação)
router.put("/usuario/alterar", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    const user = req.body;

    if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ msg: "Nenhum dado foi fornecido." });
    }

    await usuario.editarUsuario(id, user);
    res.status(200).json({ msg: "Usuário alterado com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar o usuário:", error);
    res.status(500).json({ msg: "Erro ao alterar o usuário." });
  }
});

// Excluir usuário (com autenticação)
router.delete("/usuario/excluir/:senha", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    const { senha } = req.params;

    if (!senha) {
      return res.status(400).json({ msg: "Senha é obrigatória." });
    }

    const result = await usuario.excluirUsuario(id, senha);
    if (result.error) {
      return res.status(404).json({ msg: result.error });
    }

    res.status(200).json({ msg: result.message });
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
    res.status(500).json({ msg: "Erro ao excluir o usuário." });
  }
});

// Recuperar senha
router.post("/usuario/recuperarSenha", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "E-mail é obrigatório." });
  }

  try {
    const usuarioEncontrado = await usuario.buscarPorEmail(email);

    if (!usuarioEncontrado) {
      return res.status(200).json({
        msg: "Se o e-mail estiver cadastrado, enviaremos as instruções para redefinição.",
      });
    }

    const token = gerarToken(usuarioEncontrado.id, "15m");
    const envio = await enviarEmailRecuperacao(email, token);

    if (!envio) {
      return res.status(500).json({
        msg: "Erro ao enviar o e-mail de recuperação. Tente novamente mais tarde.",
      });
    }

    res.status(200).json({
      msg: "Se o e-mail estiver cadastrado, enviaremos as instruções para redefinição.",
    });
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error);
    res.status(500).json({
      msg: "Erro ao processar solicitação. Tente novamente mais tarde.",
    });
  }
});

router.post("/usuario/registrarNovaSenha", authMiddleware, async (req, res) => {
  try {
    const { novaSenha } = req.body;
    const id = req.user.id; // o middleware insere isso ao decodificar o token

    if (!novaSenha) {
      return res.status(400).json({ msg: "Nova senha é obrigatória." });
    }

    await usuario.registrarNovaSenha(id, novaSenha);

    res.status(200).json({ msg: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    res.status(500).json({ msg: "Erro ao redefinir a senha." });
  }
});

router.post("/usuario/dashboard/cuidador", authMiddleware, async (req, res) => {
  try {
    const { cuidadorId } = req.body;
    const dados = await util.dashboardCuidador(cuidadorId);
    return res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ msg: "Erro: ", error });
  }
});

router.post(
  "/usuario/dashboard/contratante",
  authMiddleware,
  async (req, res) => {
    try {
      const { contratanteId } = req.body;
      const dados = await util.dashboardContratante(contratanteId);
      return res.status(200).json(dados);
    } catch (error) {
      res.status(500).json({ msg: "Erro: ", error });
    }
  }
);

module.exports = router;
