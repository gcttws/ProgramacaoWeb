const Sequelize = require('sequelize')
const Produto = require('../model/produto');

function indexView(req, res) {
    res.render('index.html');
}

function homeView(req, res) {

    Produto.findAll({
        where: {
            usuario_id: req.session.usuario.id,
            quantidade: {
                [Sequelize.Op.gt] : 1 // Usando o operador 'greater than' do Sequelize
            }
        }
    }).then((produtos)=>{
        res.render('home.html', {produtos});
    }).catch((erro_recupera_produtos)=>{
        res.render('home.html', {erro_recupera_produtos});
    });
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
        res.redirect('/home');
    }).catch((err) => {
        console.log(err);
        let erro_cadastrar_produto = true;
        res.render("home.html", {erro_cadastrar_produto});
    })
}

module.exports = {
    indexView,
    homeView,
    cadastrarProduto
}