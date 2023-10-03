//IMPORTS
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

/*
    Configuração do Mustache
*/
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true}));

/*
    Definições de rotas
*/
app.get('/', function(req, res){
    res.render('index.html');
});

app.post('/dados', function(req, res){
    const {nome, endereco, telefone, data} = req.body;
    const usuario = {nome, endereco, telefone, data}
    
    res.render('dados.html', {usuario});
});


/*
    Configurando Porta
*/
const PORT = 8080;
app.listen(PORT, () =>{
    console.log("App rodando na porta: " + PORT);
});