// Conexão ao Banco de Dados MySQL com Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zelo_db', 'zelo_admin', 'fas7HFiue3fa', {
    host: '81.167.247.149',
    port: 23306,
    dialect: 'mysql',
    ssl: false, 
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados/Database connected');
    })
    .catch((erro) => {
        console.error('Erro de conexão com o banco de dados', erro);
    });

sequelize.sync({}).then(() => {
    return console.log(sequelize.getQueryInterface().showAllTables());
});

module.exports = sequelize;
