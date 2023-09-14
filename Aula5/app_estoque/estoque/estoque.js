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

module.exports ={
    criar_produto,
    adicionar_produto,
    listar_produtos
}