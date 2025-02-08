//Conexão ao Banco de Dados MySQL
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '81.167.247.149',
    port: 23306,
    user: 'zelo_admin',
    password: 'fas7HFiue3fa',
    database: 'zelo_db',
    ssl: false
});

connection.connect((erro) => {
    if (erro){
        console.error('Erro de conexão' + erro);
    } else {
        console.log('Conectado ao banco de dados/Database connected');             
    }
});


module.exports = connection;
