const calculadora = require('../calculadora/calculadora');

function indexView(req, res){
    res.render('index.html');
}

function calcular(req, res){
    let n1 = Number.parseInt(req.body.n1);
    let n2 = Number.parseInt(req.body.n2);
    let operador = req.body.operador;

    if(!(Number.isInteger(n1) && Number.isInteger(n2))){
        res.send('Número inválido!');
    }else if(operador === '+'){
        res.send(`${n1} + ${n2} = ${calculadora.somar(n1, n2)}`);
    }else if (operador === "-"){
        res.send(`${n1} - ${n2} = ${calculadora.subtrair(n1, n2)}`);
    }else if(operador === '*'){
        res.send(`${n1} * ${n2} = ${calculadora.multiplicar(n1, n2)}`);
    }else if(operador === '/'){
        res.send(`${n1} / ${n2} = ${calculadora.dividir(n1, n2)}`);
    }
    
}

module.exports = {
    indexView,
    calcular
}