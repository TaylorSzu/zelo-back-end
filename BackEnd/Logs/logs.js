const chalk = require("chalk");
const connected = require("../Database/Database");

// Importação dos models
const Usuario = require("../Models/userModel.js");
const Cuidador = require("../Models/cuidadorModel.js");
const Contratante = require("../Models/contratanteModel.js");
const Agendamento = require("../Models/agendamentoModel.js");

// Funções de estilo para os logs
const getTimestamp = () => chalk.gray(`[${new Date().toLocaleString()}]`);

const log = {
    info: (msg) => console.log(`${getTimestamp()} ${chalk.blueBright("[INFO]")} ${msg}`),
    success: (msg) => console.log(`${getTimestamp()} ${chalk.greenBright("[✅ SUCESSO]")} ${msg}`),
    warn: (msg) => console.log(`${getTimestamp()} ${chalk.keyword("orange")("[⚠️ AVISO]")} ${msg}`),
    error: (msg) => console.error(`${getTimestamp()} ${chalk.redBright("[❌ ERRO]")} ${msg}`),
    tableName: (modelName) => console.log(`${getTimestamp()} ${chalk.yellowBright("📊 TABELA:")} ${chalk.bold(modelName)}`),
    separator: () => console.log(chalk.gray("──────────────────────────────────────────────────────────"))
};

// Execução dos logs
connected.sync({})
    .then(async () => {
        log.separator();

        const usuarios = await Usuario.findAll();
        log.tableName(Usuario.getTableName());
        log.success("Usuários sincronizados.");
        log.info(`Total de usuários: ${usuarios.length}`);
        log.separator();

        const cuidadores = await Cuidador.findAll();
        log.tableName(Cuidador.getTableName());
        log.success("Cuidadores sincronizados.");
        log.info(`Total de cuidadores: ${cuidadores.length}`);
        log.separator();

        const contratantes = await Contratante.findAll();
        log.tableName(Contratante.getTableName());
        log.success("Contratantes sincronizados.");
        log.info(`Total de contratantes: ${contratantes.length}`);
        log.separator();

        const agendamentos = await Agendamento.findAll();
        log.tableName(Agendamento.getTableName());
        log.success("Agendamentos sincronizados.");
        log.info(`Total de agendamentos: ${agendamentos.length}`);
        log.separator();

    })
    .catch(error => {
        log.separator();
        log.error("Erro ao sincronizar ou buscar dados:");
        log.error(error.message);
        log.separator();
    });
