const express = require('express');
const app = express();
const cors = require('cors');
const port = 9050;
const ejs = require('ejs');
const session = require('express-session');
const body_parser = require('body-parser');
const database = require('./DB/DB');
const path = require('path');

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Conexão ao FrontEnd
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'FrontEnd')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'FrontEnd/layout')));
app.use('/img', express.static(path.join(__dirname, 'FrontEnd/layout/IMG')));
app.use('/css', express.static(path.join(__dirname, 'FrontEnd/layout/CSS')));
app.use('/html', express.static(path.join(__dirname, 'FrontEnd/layout/HTML')));


 //----Exportações-----
 module.exports = {
    app : app,
    path: path,
    express: express,
    session: session,
    body_parser: body_parser
}