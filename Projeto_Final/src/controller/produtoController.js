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
    req.session.produtoIdEditar = req.params.id;
    const produtoId = req.params.id;

    Produto.findByPk(produtoId).then(function(produto){
        res.render("editarProduto.html", {produto})
    });
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
    let sucessoExcluir = req.query.sucesso_excluir;
    Produto.findAll({
        where:{
            usuario_id: req.session.usuario.id
        }
    }).then((produtos)=>{
        console.log(produtos);
        res.render('listagemProduto.html', {produtos, sucessoExcluir});
    }).catch((erro_recupera_produtos)=>{
        res.render('listagemProduto.html', {erro_recupera_produtos});
    });
}

function editarProduto(req, res){
    let dadosAtualizado = {
        nome_produto: typeof req.body.nome_produto === 'string' ? req.body.nome_produto : '',
        descricao_produto: typeof req.body.descricao_produto === 'string' ? req.body.descricao_produto : '',
        quantidade_produto: req.body.quantidade_produto,
        valor_produto: req.body.valor_produto, 
        categoria_produto: req.body.categoria_produto,
        estado_produto: req.body.estado_produto
    };

    Produto.update(
        dadosAtualizado, {
            where: {
                id: req.body.id,
            },
        }
    ).then(function(sucesso){
        res.redirect('/listar_produtos');

    })
    .catch(function(erro_atualizar_produto){
        res.render("editarProduto.html", {dadosAtualizado, erro_atualizar_produto});
    })
}


function excluirProduto(req, res){
    const produtoId = req.body.id;

    Produto.destroy({
        where:{
            id: produtoId
        }
    }).then((sucesso) => {
        res.redirect('/listar_produtos?sucesso_excluir=1');
    }).catch(erro_excluir_produto => {
        erro_excluir_produto = true;
        console.log(err)
        res.render('listagemProduto.html', {erro_excluir_produto});
    })
}

module.exports = {
    indexView,
    homeView,
    cadastroProdutoView,
    listagemProdutoView,
    editarProdutoView,
    cadastrarProduto,
    listarProdutos,
    editarProduto,
    excluirProduto
}