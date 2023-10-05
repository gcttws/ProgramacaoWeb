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
    const usuario = {
        nome: req.body.nome,
        endereco: req.body.endereco, 
        telefone: req.body.telefone, 
        data_agendamento: req.body.data_agendamento
    };

    let erro_form = false;
    if(usuario.nome == ""){
        erro_form = true;
    }
    if(usuario.endereco == ""){
        erro_form = true;
    }
    if(usuario.telefone == ""){
        erro_form = true;
    }
    if(usuario.data_agendamento == ""){
        erro_form = true;
    }
    res.render('dados.html', {usuario, erro_form});
});


/*
    Configurando Porta
*/
const PORT = 8080;
app.listen(PORT, () =>{
    console.log("App rodando na porta: " + PORT);
});