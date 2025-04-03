import Cuidador from "../Models/cuidadorModel.js";
import connected from "../Database/Database.js";
import chalk from "chalk";


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

    export default Cuidador;