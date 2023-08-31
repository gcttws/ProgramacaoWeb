/*
Exercício 1

Faça a declaração de 2 variáveis numéricas para cada
operador e guarde o resultado da operação em uma terceira
variável;
Para cada resultado obtido, imprima o texto “Resultado da
{operação} entre {num_A} e {num_B} = {num_C}”.

*/
let max = 100;
let min = 1;

//SOMA
var num_A = Math.floor(Math.random() * (max - min + 1)) + min;
var num_B = Math.floor(Math.random() * (max - min + 1)) + min;

var result = num_A + num_B;
console.log("Resultado da ' + ' entre " + num_A + " e " + num_B + " = " + result);

//SUBTRAÇÃO
var num_A = Math.floor(Math.random() * (max - min + 1)) + min;
var num_B = Math.floor(Math.random() * (max - min + 1)) + min;

var result = num_A - num_B;
console.log("Resultado da ' - ' entre " + num_A + " e " + num_B + " = " + result);

//MULTIPLICAÇÃO
var num_A = Math.floor(Math.random() * (max - min + 1)) + min;
var num_B = Math.floor(Math.random() * (max - min + 1)) + min;

var result = num_A * num_B;
console.log("Resultado da ' * ' entre " + num_A + " e " + num_B + " = " + result);

//DIVISÃO
var num_A = Math.floor(Math.random() * (max - min + 1)) + min;
var num_B = Math.floor(Math.random() * (max - min + 1)) + min;

var result = num_A / num_B;
console.log("Resultado da ' / ' entre " + num_A + " e " + num_B + " = " + result.toFixed(2));