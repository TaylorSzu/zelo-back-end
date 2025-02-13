//LOGS DE SERVIÇOS
import User from "../Models/userModel.js";
import connected from "../Database/Database.js";

connected.sync()
    .then(() => {
        console.log("Tabela sincronizada");

    })
    .then(() => {
       
        return User.findAll(); 
    })
    .then(users => {
        console.log("Todos os dados:", users.map(user => user.toJSON()));
    })
    .catch(error => {
        console.error("Erro ao sincronizar a tabela", error);
    });

export default connected;