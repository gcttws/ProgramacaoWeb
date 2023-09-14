const express = require('express');
const estoque = require('./estoque/estoque.js');

const app = express();

app.get("/", function(req, res){
    res.send("TESTE");
});

app.get("/api/estoque/cadastrar/:id/:nome/:qtd", function(req, res){
    let id = req.params.id;
    let nome = req.params.nome;
    let qtd = req.params.qtd;
    let p = estoque.criar_produto(id, nome, qtd);
    estoque.adicionar_produto(p);
    res.json(p);
});

app.get("/api/estoque/listar", function(req, res) {
    res.json(estoque.listar_produtos());
});

const PORT = 8080;
app.listen(PORT, function(){
    console.log("App rodando na porta " + PORT);
});