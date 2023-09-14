let produtos = Array();

function criar_produto(id, nome, qtd){
    let p = {
        id: id,
        nome: nome,
        quantidade: qtd
    };

    return p;
}

function adicionar_produto(p){
    produtos.push(p);
}

function listar_produtos(){
    return produtos;
}

function editar_produto(id, qtdAtual){
    let pRetorno = {};

    produtos.forEach(p => {
        if(p.id == id){
            p.quantidade = qtdAtual;
            pRetorno = p;
        }
    });
    return pRetorno;
}
function remover_produto(id) {
    const indice = produtos.findIndex(p => p.id === id);
    if (indice !== -1) {
        produtos.splice(indice, 1);
        return true; // Produto removido com sucesso
    }
    return false; // Produto com o ID fornecido não encontrado
}

module.exports ={
    criar_produto,
    adicionar_produto,
    listar_produtos,
    editar_produto,
    remover_produto
}