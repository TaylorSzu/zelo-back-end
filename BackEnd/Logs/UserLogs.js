//LOGS DE SERVIÇOS
import User from "../Models/userModel.js";
import connected from "../Database/Database.js";
import chalk from "chalk";


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

    export default User;