const Anotacao = require('../model/produto');

function indexView(req, res) {
    res.render('index.html');
}

function homeView(req, res) {

    Anotacao.findAll({
        where: {
            id_usuario: req.session.usuario.id,
            indicador_ativo: 1
        }
    }).then((anotacaos)=>{
        res.render('home.html', {anotacaos});
    }).catch((erro_recupera_anotacaos)=>{
        res.render('home.html', {erro_recupera_anotacaos});
    });

    
}

module.exports = {
    indexView,
    homeView
}