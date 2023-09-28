/**
 * Imports 
 */
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
/**
 * 
 */
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');



app.get('/', function(req, res){
    let usuario = {
        nome: 'Jota',
        telefone: 123
    };

    res.render('index.html', {usuario});
});

app.post('/dados', function (req, res){
    
});

const PORT = 8080;
app.listen(PORT, () =>{
    console.log('App rodando na porta: ' + PORT);
});

