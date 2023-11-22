const Sequelize = require('sequelize')
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
        nome: typeof req.body.nome === 'string' ? req.body.nome : '',
        descricao: typeof req.body.descricao === 'string' ? req.body.descricao : '',
        quantidade: req.body.quantidade,
        preco_custo: req.body.preco_custo,
        preco_venda: req.body.preco_venda,
        categoria: req.body.categoria,
        usuario_id: req.session.usuario.id
    }

    Produto.create(produto).then(()=>{
        let sucesso = true;
        res.render("cadastroProduto.html", {sucesso});
        res.redirect('/api/produtos');
    }).catch((err) => {
        console.log(err);
        let erro_cadastrar_produto = true;
        res.render("cadastroProduto.html", {erro_cadastrar_produto});
    })
}

function listarProdutos(req, res){
    Produto.findAll({
        where: {
            usuario_id: req.session.usuario.id,
            quantidade: {
                [Sequelize.Op.gt] : 1 // Usando o operador 'greater than' do Sequelize
            }
        }
    }).then((produtos)=>{
        res.render('listagemProduto.html', {produtos});
    }).catch((erro_recupera_produtos)=>{
        res.render('listagemProduto.html', {erro_recupera_produtos});
    });
}

function excluirProduto(req, res){

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