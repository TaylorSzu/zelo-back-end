import cancelamento from "../Models/cancelamentoModel.js";
import connected from "../Database/Database.js";
import chalk from "chalk";

connected.sync({})
    .then(() => {
        return cancelamento.findAll(); 
    })
    .then(cancelamentos => {
        console.log(chalk.blue("TODOS OS DADOS:", cancelamentos.map(cancelamento => cancelamento.toJSON())));
        console.log(chalk.yellow("TABELA REFERENTE:", cancelamento.getTableName()));
        console.log("QUANTIDADE DE DADOS:", cancelamento.count(), '\n');
        console.log(chalk.white.bgWhite("------------------------------------------\n"));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

    export default cancelamento;