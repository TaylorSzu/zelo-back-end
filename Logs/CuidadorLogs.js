const Cuidador = require("../Models/cuidadorModel");
const connected = require("../Database/Database");
const chalk = require("chalk");

connected.sync({})
    .then(() => {
        return Cuidador.findAll(); 
    })
    .then(cuidadores => {
        console.log(chalk.yellow("TABELA REFERENTE:", Cuidador.getTableName()));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

module.exports = Cuidador;
