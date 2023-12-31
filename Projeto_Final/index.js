const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const db = require('./src/db');
const path = require('path');

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'secret-token',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}));

//Define as rotas da aplicação (declaradas na pasta /src/routes/)
app.use('/', require('./src/routes/produtoRoutes'));
app.use('/', require('./src/routes/autenticacaoRoutes'));
app.use('/', require('./src/routes/usuarioRoutes'));

db.sync(() => console.log(`Banco de dados conectado`));

const PORT = 8080;
app.listen(PORT, () => {
    console.log('App rodando na porta: ' + PORT)
});