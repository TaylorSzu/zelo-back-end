// Importações
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import userRoutes from '../BackEnd/Routes/userRouter.js';
import cuidadorRoutes from '../BackEnd/Routes/cuidadorRoutes.js';
import agendamentoRoutes from '../BackEnd/Routes/agendamentoRoutes.js';
import contratanteRoutes from '../BackEnd/Routes/contratanteRoutes.js';
import userLogs from '../BackEnd/Logs/UserLogs.js';
import cuidadoresLogs from '../BackEnd/Logs/CuidadorLogs.js';


//Porta do servidor
const app = express();
const port = 5171;

app.use(cors({
    origin: 'http://localhost:5173', // O endereço do seu frontend (ajuste conforme necessário)
    credentials: true, // Permite o envio de cookies, como o token JWT
}));

// Configuração de middlewares (ordem correta)
app.use(express.json()); // Processa JSON corretamente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessão (corrigido)
app.use(session({
    secret: 'zelo',
    resave: false,
    saveUninitialized: true, // Agora configurado corretamente
    cookie: { secure: false } // Se usar HTTPS, mude para `true`
}));

// Configuração de upload de arquivos
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Configuração de arquivos estáticos e template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rotas
app.use(userRoutes);
app.use(cuidadorRoutes);
app.use(agendamentoRoutes);
app.use(contratanteRoutes);

// Teste de funcionamento

app.get('/data', (req, res) => {
    res.json({ msg: 'Funcionando' });
});

app.get('/', (req, res) => {
    res.json({ 'Status': 'Funcionando' });
});

// Rota 404
app.all('*', (req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Exportações
export default { app, path, express, session, bodyParser };
