// Faça um algoritmo que imprime uma matriz A e sua transposta

let matriz = [
    [1,2],
    [3,4],
    [5,6]
];

let rows = matriz.length;
let cols = matriz[0].length;

//console.log("Colunas: " + cols, "\nLinhas: " + rows);

//cria a matriz transposta com a quantidade de linhas[rows] e colunas[cols] certas e preenche com todos os elementos com 0
let matrizTransposta = new Array(cols).fill().map(() => new Array(rows).fill(0));
//console.log(matrizTransposta);

for(let i =0; i < rows; i++){
    for(let j=0; j < cols; j++){
        matrizTransposta[j][i] = matriz[i][j];
    };
};

console.log("Matriz original: ");
matriz.forEach(row => console.log(row));

console.log("\nMatriz Transposta: ");
matrizTransposta.forEach(row => console.log(row));

