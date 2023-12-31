const Usuario = require("../model/usuario");
const { homeView } = require("./produtoController");

function homeViewUsuario(req, res) {
  const usuarioId = req.session.usuarioId;
  res.render("/home.html", { usuarioId });
}

function editarUsuarioView(req, res) {
  const usuarioId = req.session.id;
  console.log(usuarioId);
  Produto.findByPk(usuarioId).then(function (usuario) {
    res.render("editarUsuario.html", { usuario });
  });
}

function cadastrarUsuario(req, res) {
  let usuario = {
    email: typeof req.body.email === "string" ? req.body.email.trim() : "",
    senha: typeof req.body.senha === "string" ? req.body.senha.trim() : "",
    nome: typeof req.body.nome === "string" ? req.body.nome.trim() : "",
    data_nascimento:
      typeof req.body.data_nascimento === "string"
        ? req.body.data_nascimento.trim()
        : "",
  };

  if (!validaCamposInput(usuario)) {
    let erro = true;
    res.render("index.html", {
      erro,
      mensagem: "Todos os campos são obrigatórios.",
    });
    return;
  }

  if (!validaEmail(usuario.email)) {
    let erro = true;
    res.render("index.html", { erro, mensagem: "E-mail inválido." });
    return;
  }

  if (!validaDataNascimento(usuario.data_nascimento)) {
    let erro = true;
    res.render("index.html", {
      erro,
      mensagem: "Usuário deve ser maior de 18 anos.",
    });
    return;
  }

  Usuario.create(usuario)
    .then(() => {
      let sucesso = true;
      res.render("index.html", { sucesso });
    })
    .catch((err) => {
      console.log(err);
      let erro = true;
      res.render("index.html", { erro });
    });
}

function editarUsuario(req, res) {
  const usuarioId = req.session.id;

  let dadosAtualizados = {
    email: typeof req.body.email === "string" ? req.body.email.trim() : "",
    senha: typeof req.body.senha === "string" ? req.body.senha.trim() : "",
    nome: typeof req.body.nome === "string" ? req.body.nome.trim() : "",
    data_nascimento:
      typeof req.body.data_nascimento === "string"
        ? req.body.data_nascimento.trim()
        : "",
  };

  Usuario.update(dadosAtualizados, {
    where: {
      id: usuarioId,
    },
  })
    .then(function () {
      res.redirect("/home");
    })
    .catch(function (erro_atualizar_usuario) {
      // Lide com erros aqui, talvez renderizando uma página de erro
      console.error(erro_atualizar_usuario);
      res.render("editarUsuario.html", { erro_atualizar_usuario });
    });
}

function listarUsuarios(req, res) {
  Usuario.findAll()
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      res.json(err);
    });
}

function validaCamposInput(usuario) {
  const camposRequeridos = ["email", "senha", "nome", "data_nascimento"];
  for (let campo of camposRequeridos) {
    if (!usuario[campo] || usuario[campo].trim() == "") {
      return false;
    }
  }
  return true;
}

function validaDataNascimento(dataNascimento) {
  const dataAtual = new Date();
  const dataLimiteParaMaiorIdade = new Date(
    dataAtual.getFullYear() - 18,
    dataAtual.getMonth(),
    dataAtual.getDate()
  );

  return new Date(dataNascimento) <= dataLimiteParaMaiorIdade;
}

function validaEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regexEmail.test(email);
}

module.exports = {
  homeViewUsuario,
  cadastrarUsuario,
  listarUsuarios,
  editarUsuarioView,
  editarUsuario,
};
