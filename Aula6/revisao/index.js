const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("APP WEB Revisão");
});

app.get("/hello", function(req, res){
    res.send("Olá, mundo!");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App esta rodando na porta: ${PORT}`);
});