let produtos = [];
let paginasProdutos = [];
let paginaSelecionada;
let indiceSelecionado;
let indiceInicial;
let indiceFinal;
let listaPaginacao;

fetch("localhost:8080/listar_produtos")
.then(response => response.json())
.then(json => {
    console.log(json);
    produtos = json;

    let numeroDePaginas = produtos.length / 10;
    const numeroDePaginasRemanescentes = numeroDePaginas % 1;
    const numeroDePaginasRemanescenteSemResto = Math.floor(numeroDePaginas);

    if (numeroDePaginasRemanescentes > 0)
        numeroDePaginas = Number(numeroDePaginasRemanescenteSemResto) + 1;
    
    paginasProdutos = Array(numeroDePaginas)
    .fill(1)
    .map((x, i) => i + 1);

    indiceInicial = 0;
    indiceFinal = 10;
    paginaSelecionada = 1;
    
    // preenche a lista de paginação
    injetaPaginacao();

    // começa a mapear a lista
    injetaPagina();
});

injetaPaginacao = () => {
    listaPaginacao = `
        <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goPrevious()">Previous</a></li>
        <li class="page-item"><span class="page-link" id="spanpaginaSelecionada">${paginaSelecionada} | ${paginasProdutos.length}</span></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goNext()">Next</a></li>
    `;
    document.getElementById("paging").innerHTML = listaPaginacao; 
}

injetaPagina = () => {
    const lista = produtos 
    ? produtos
    .slice(indiceInicial, indiceFinal)
    .map((produto, index) => { 
    <p>${index}</p>
    }).join("") : "";

    document.getElementById("lista_produtos").innerHTML = lista;
};

goPrevious = () => {
    if (paginaSelecionada != 1) {
      indiceInicial -= 10;
      indiceFinal -= 10;
      paginaSelecionada--;
      injectPage();
      injectPagination();
    }
  };
  
  goNext = () => {
    if (paginaSelecionada < todosPages.length) {
      indiceInicial += 10;
      indiceFinal += 10;
      paginaSelecionada++;
      injectPage();
      injectPagination();
    }
  };