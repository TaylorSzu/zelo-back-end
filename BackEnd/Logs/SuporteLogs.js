import Suporte from "../Models/suporteModel.js";
import connected from "../Database/Database.js";
import chalk from "chalk";

connected.sync({})
    .then(() => {
       
        return Suporte.findAll(); 
    })
    .then(suportes => {
        console.log(chalk.blue("TODOS OS DADOS:", suportes.map(suporte => suporte.toJSON())));
        console.log(chalk.yellow("TABELA REFERENTE:", Suporte.getTableName()));
        console.log("QUANTIDADE DE DADOS:", Suporte.count(), "\n");
        console.log(chalk.white.bgWhite("------------------------------------------\n"));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

    export default Suporte;