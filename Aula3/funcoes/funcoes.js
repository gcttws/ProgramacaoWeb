/*function somar(a, b=3){
    
    return a+b;
}
*/

function contarAteN(n){
    if(n > 0){
        
        contarAteN(n-1);
        console.log(n);
    }
}

const calculadora = {
    somar: function(a, b){
        return a+b;
    },

    subtrair: function(a, b){
        return a-b;
    }
}

contarAteN(5);
console.log(calculadora.subtrair(20,3))

