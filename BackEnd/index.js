const express = require('express');
const app = express();
const cors = require('cors');
const port = 9050;
const session = require('express-session');
const body_parser = require('body-parser');
const database = require('./Database/Database');
const path = require('path');
const fileupload = require('express-fileupload');

app.use(session({secret: 'zelo',}))
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));
app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'FrontEnd/layout/HTML'));
app.use(cors());

app.get('/teste', (req, res) => {
    res.json({'msg': 'Funcionando'});
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

    //POST

// app.post('/loginTeste', (req, res) => {
//     res.json({'msg': 'Funcionando'});
// })

    //ALL
app.all('*', (req, res) => {
    res.status(404).send('Página não encontrada');
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
 //----Exportações-----
 module.exports = {
    app : app,
    path: path,
    express: express,
    session: session,
    body_parser: body_parser
}