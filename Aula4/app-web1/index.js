const calc = require('./util/calculadora');
const express = require('express');


const app = express();

app.get("/", function(req, res){
    res.send('Teste');
});

app.get("/somar/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;
    res.send(`${a} + ${b} = ${calc.somar(a, b)}`);
});


app.get("/subtrair/:a/:b", function (req, res) {
    let a = req.params.a;
    let b = req.params.b;
    res.send(`${a} - ${b} = ${calc.subtrair(a, b)}`);
});

app.get("/multiplicar/:a/:b", function (req, res) {
    let a = req.params.a;
    let b = req.params.b;
    res.send(`${a} * ${b} = ${calc.multiplicar(a,b)}`);
});

app.get("/dividir/:a/:b", function(req, res) {
    let a = req.params.a;
    let b = req.params.b;
    res.send(`${a} / ${b} = ${calc.dividir(a, b)}`);
});

const PORT = 8080;

app.listen(PORT, function () {
    console.log("app rodando na porta " + PORT);
});