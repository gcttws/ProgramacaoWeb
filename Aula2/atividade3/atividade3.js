//Faça um algoritmo de multiplicação de matrizes AxB = C;
/*
É primordial que o número de colunas da primeira matriz seja igual
ao número de linhas da segunda matriz. Se for diferente, o algoritmo
deve informar "Não é possível calcular"
*/

//MATRIZ A
let matrizA = [
    [1,3],
    [2,5]
];

let rowsA = matrizA.length;
let colsA = matrizA[0].length;

//MATRIZ B
let matrizB = [
    [2,2],
    [0,1]
];

let rowsB = matrizB.length;
let colsB = matrizB[0].length;

//MATRIZ C
let result = new Array(rowsA).fill().map(() => new Array(colsB).fill(0));
//result.forEach(row => console.log(row));

/*
let col1androw1 = (matrizA[0][0] * matrizB[0][0]) + (matrizA[0][1] * matrizB[1][0]);    let col1androw2 = (matrizA[1][0] * matrizB[0][0]) + (matrizA[1][1] * matrizB[1][0]);

let col2androw1 = (matrizA[0][0] * matrizB[0][1]) + (matrizA[0][1] * matrizB[1][1]);    let col2androw2 = (matrizA[1][0] * matrizB[0][1]) + (matrizA[1][1] * matrizB[1][1]);
*/
if(colsA !== rowsB ){
    throw new Error("Não é possível calcular");
}else{
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }
    
    console.log("Matriz A:");
    matrizA.forEach(row => console.log(row));
    console.log("\nMatriz B: ");
    matrizB.forEach(row => console.log(row));
    console.log("\nResultado da multiplicação: ");
    result.forEach(row => console.log(row));
}



/*
console.log(col1androw1, col2androw1);
console.log(col1androw2, col2androw2);
*/
