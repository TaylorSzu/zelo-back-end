import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import database from './Database/Database.js';
import indexLogs from './Logs/indexLogs.js';
import ansi_styles from 'ansi-styles';

const app = express();
const port = 9050;

app.use(session({secret: 'zelo',}))
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(cors());

app.get('/teste', (req, res) => {
    res.json({'msg': 'Funcionando'});
})

app.get('/', (req, res) => {
    res.json({'Status': 'Funcionando'});
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
export default { app, path, express, session, bodyParser };