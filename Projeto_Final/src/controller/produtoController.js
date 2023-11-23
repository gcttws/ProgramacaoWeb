const Sequelize = require('sequelize');
const Produto = require('../model/produto');

function indexView(req, res) {
    res.render('index.html');
}

function homeView(req, res) {
    res.render('home.html');
}

function cadastroProdutoView(req, res){
    res.render('cadastroProduto.html');
}

function listagemProdutoView(req, res){
    res.render('listagemProduto.html');
}

function editarProdutoView(req,res){
    res.render('editarProduto.html');
}

function cadastrarProduto(req, res){
    let produto = {
        nome_produto: typeof req.body.nome_produto === 'string' ? req.body.nome_produto : '',
        descricao_produto: typeof req.body.descricao_produto === 'string' ? req.body.descricao_produto : '',
        quantidade_produto: req.body.quantidade_produto,
        valor_produto: req.body.valor_produto, 
        categoria_produto: req.body.categoria_produto,
        estado_produto: req.body.estado_produto,
        usuario_id: req.session.usuario.id
    }

    Produto.create(produto).then(()=>{
        let sucesso = true;
        res.render("cadastroProduto.html", {sucesso});
    }).catch((err) => {
        console.log(err);
        let erro_cadastrar_produto = true;
        res.render("cadastroProduto.html", {erro_cadastrar_produto});
    })
}

function listarProdutos(req, res){
    Produto.findAll({
        where:{
            usuario_id: req.session.usuario.id
        }
    }).then((produtos)=>{
        console.log(produtos);
        res.render('listagemProduto.html', {produtos});
    }).catch((erro_recupera_produtos)=>{
        res.render('listagemProduto.html', {erro_recupera_produtos});
    });
}

/*
{
        where: {
            usuario_id: req.session.usuario.id,
            quantidade_produto: {
                [Sequelize.Op.gt] : 1 // Usando o operador 'greater than' do Sequelize
            }
        }
    }
function listarProdutosRetornaJSON(req, res) {
    Produto.findAll({
        where: {
            usuario_id: req.session.usuario.id,
            quantidade: {
                {Sequelize.Op.gt} : 1
            }
        }
    })
}
*/
function excluirProduto(req, res){

}


function listaCategorias(){
    return Produto.rawAttributes.categoria_produto.values;
}

module.exports = {
    indexView,
    homeView,
    cadastroProdutoView,
    listagemProdutoView,
    editarProdutoView,
    cadastrarProduto,
    listarProdutos,
    excluirProduto
}