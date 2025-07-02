// Importações
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const userRoutes = require("../BackEnd/Routes/userRouter.js");
const cuidadorRoutes = require("../BackEnd/Routes/cuidadorRoutes.js");
const agendamentoRoutes = require("../BackEnd/Routes/agendamentoRoutes.js");
const contratanteRoutes = require("../BackEnd/Routes/contratanteRoutes.js");
const avaliacaoRoutes = require("../BackEnd/Routes/avaliacaoRoutes.js");
const idosoRoutes = require("../BackEnd/Routes/idosoRoutes.js");
const { associarModelos } = require("../BackEnd/Database/associacao.js");
const logs = require("../BackEnd/Logs/logs.js");

// Porta do servidor
const app = express();
const port = 5171;

app.use(
  cors({
    origin: "https://zelloapp.com.br:5173", // O endereço do seu frontend (ajuste conforme necessário)
    credentials: true, // Permite o envio de cookies, como o token JWT
  })
);

// Configuração de middlewares (ordem correta)
app.use(express.json()); // Processa JSON corretamente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessão (corrigido)
app.use(
  session({
    secret: "zelo",
    resave: false,
    saveUninitialized: true, // Agora configurado corretamente
    cookie: { secure: false }, // Se usar HTTPS, mude para `true`
  })
);

// Configuração de upload de arquivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Configuração de arquivos estáticos e template engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Associações das Models
associarModelos();

// Rotas
app.use(userRoutes);
app.use(cuidadorRoutes);
app.use(agendamentoRoutes);
app.use(contratanteRoutes);
app.use(avaliacaoRoutes);
app.use(idosoRoutes);

// Teste de funcionamento
app.get("/data", (req, res) => {
  res.json({ msg: "Funcionando" });
});

app.get("/", (req, res) => {
  res.json({ Status: "Funcionando" });
});

// Rota 404
app.all("*", (req, res) => {
  res.status(404).send("Página não encontrada");
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportações
module.exports = { app, path, express, session, bodyParser, port, userRoutes, cuidadorRoutes, agendamentoRoutes, contratanteRoutes, avaliacaoRoutes, idosoRoutes };
