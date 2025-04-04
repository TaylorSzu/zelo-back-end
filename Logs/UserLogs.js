// LOGS DE SERVIÇOS
const User = require("../Models/userModel");
const connected = require("../Database/Database");
const chalk = require("chalk");

connected.sync({})
    .then(() => {
        return User.findAll(); 
    })
    .then(users => {
        console.log(chalk.yellow("TABELA REFERENTE:", User.getTableName()));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

module.exports = User;
