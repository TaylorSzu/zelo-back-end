//LOGS DE SERVIÇOS
import User from "../Models/userModel.js";
import connected from "../Database/Database.js";


connected.sync({})
    .then(() => {
        console.log("--------------------------------TABELA DE USUÁRIOS--------------------------------");
    })
    .then(() => {
       
        return User.findAll(); 
    })
    .then(users => {
        console.log("Todos os dados:", users.map(user => user.toJSON()));
        console.log("Tabela Referente:", User.getTableName());
        console.log("Quantidade de dados:", User.count());
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

