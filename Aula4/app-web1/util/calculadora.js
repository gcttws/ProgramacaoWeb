function somar(a, b) {
    return Number.parseInt(a) + Number.parseInt(b);
}

function subtrair(a, b) {
    return Number.parseInt(a) - Number.parseInt(b);
}

function multiplicar(a, b){
    return Number.parseInt(a) * Number.parseInt(b);
}

function dividir(a, b){
    return Number.parseFloat(a) / Number.parseFloat(b);
}

const PI = 3.14;

function imprimePI(){
    console.log(PI);
}

module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    PI,
    imprimePI
}