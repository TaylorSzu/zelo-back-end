//LOGS DE SERVIÇOS
import User from "../Models/userModel.js";
import connected from "../Database/Database.js";
import chalk from "chalk";


connected.sync({})
    .then(() => {
       
        return User.findAll(); 
    })
    .then(users => {
        console.log(chalk.blue("TODOS OS DADOS:", users.map(user => user.toJSON())));
        console.log(chalk.yellow("TABELA REFERENTE:", User.getTableName()));
        console.log("QUANTIDADE DE DADOS:", User.count(), '\n');
        console.log(chalk.white.bgWhite("------------------------------------------\n"));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

    export default User;