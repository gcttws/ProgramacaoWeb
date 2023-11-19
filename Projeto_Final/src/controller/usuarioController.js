const Usuario = require('../model/usuario');

function cadastrarUsuario(req, res) {
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    }
    
    if(!validarUsuario(usuario)){
        let erro = true;
        res.render("index.html", {erro, mensagem: "Todos os campos são obrigatórios."})
        return -1;
    }

    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        res.render("index.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("index.html", {erro});
    });

}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios)=>{
        res.json(usuarios);
    }).catch((err)=>{
        res.json(err);
    });
}

function validarUsuario(usuario){
    const camposRequeridos = ['email', 'senha', 'nome', 'data_nascimento'];
    for(let campo of camposRequeridos){
        if(!usuario[campo] || usuario[campo].trim() == ''){
            return false;
        }
    }
    return true;
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}