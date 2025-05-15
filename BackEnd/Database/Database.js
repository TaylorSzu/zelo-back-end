// Conexão ao Banco de Dados MySQL com Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_zelloapp_senai', 'zelloapp', 'zapp629llo', {
    host: 'locahost',
    port: 3306,
    dialect: 'mysql',
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
