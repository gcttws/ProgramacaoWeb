const Sequelize = require("sequelize");
const Produto = require("../model/produto");

function indexView(req, res) {
  res.render("index.html");
}

function homeView(req, res) {
  res.render("home.html");
}

function cadastroProdutoView(req, res) {
  res.render("cadastroProduto.html");
}

function listagemProdutoView(req, res) {
  res.render("listagemProduto.html");
}

function editarProdutoView(req, res) {
  req.session.produtoIdEditar = req.params.id;
  const produtoId = req.params.id;

  Produto.findByPk(produtoId).then(function (produto) {
    res.render("editarProduto.html", { produto });
  });
}

function cadastrarProduto(req, res) {
  let produto = {
    nome_produto:
      typeof req.body.nome_produto === "string" ? req.body.nome_produto : "",
    descricao_produto:
      typeof req.body.descricao_produto === "string"
        ? req.body.descricao_produto
        : "",
    quantidade_produto: req.body.quantidade_produto,
    valor_produto: req.body.valor_produto,
    categoria_produto: req.body.categoria_produto,
    estado_produto: req.body.estado_produto,
    usuario_id: req.session.usuario.id,
  };

  // Validação dos campos
  // Remove cifra moeda
  produto.valor_produto = produto.valor_produto.replace(/(R\$ )/g, "");

  Produto.create(produto)
    .then(() => {
      let sucesso = true;
      res.render("cadastroProduto.html", { sucesso });
    })
    .catch((err) => {
      console.log(err);
      let erro_cadastrar_produto = true;
      res.render("cadastroProduto.html", { erro_cadastrar_produto });
    });
}

function listarProdutos(req, res) {
  let sucessoExcluir = req.query.sucesso_excluir;
  Produto.findAll({
    where: {
      usuario_id: req.session.usuario.id,
    },
  })
    .then((produtos) => {
      console.log(produtos);
      res.render("listagemProduto.html", { produtos, sucessoExcluir });
    })
    .catch((erro_recupera_produtos) => {
      res.render("listagemProduto.html", { erro_recupera_produtos });
    });
}

function dashboardProduto(req, res) {
  let dados = {};

  Produto.findAll({
    where: {
      usuario_id: req.session.usuario.id,
    },
  }).then((produtos) => {
    if (produtos.length === 0) {
      dados = {
        valor_total_inventario: 0,
        valor_produto_mais_caro: 0,
        item_mais_caro: "N/A",
        valor_produto_mais_barato: 0,
        item_mais_barato: "N/A",
        quantidade_total_de_produtos: 0,
      };
    } else {
      const porcentagensCategorias = calcularPorcentagensPorCategoria(produtos);

      let valor_total_inventario = produtos.reduce(
        (acc, currValue) =>
          acc + parseFloat(currValue.valor_produto.replace(",", ".")),
        0
      );

      let quantidade_total_de_produtos = produtos.reduce(
        (acc, currValue) => acc + currValue.quantidade_produto,
        0
      );

      dados["valor_total_inventario"] = valor_total_inventario;
      dados["quantidade_total_de_produtos"] = quantidade_total_de_produtos;

      let valores_produtos = produtos.map((item) =>
        parseFloat(item.valor_produto.replace(",", "."))
      );
      let valor_produto_mais_caro = Math.max(...valores_produtos);
      let valor_produto_mais_barato = Math.min(...valores_produtos);

      dados["valor_produto_mais_caro"] = valor_produto_mais_caro;
      dados["valor_produto_mais_barato"] = valor_produto_mais_barato;

      let item_mais_caro = produtos.find(
        (item) =>
          Math.abs(
            parseFloat(item.valor_produto.replace(",", ".")) -
              valor_produto_mais_caro
          ) < Number.EPSILON
      );
      dados["item_mais_caro"] = item_mais_caro
        ? item_mais_caro.nome_produto
        : "N/A";

      let item_mais_barato = produtos.find(
        (item) =>
          Math.abs(
            parseFloat(item.valor_produto.replace(",", ".")) -
              valor_produto_mais_barato
          ) < Number.EPSILON
      );
      dados["item_mais_barato"] = item_mais_barato
        ? item_mais_barato.nome_produto
        : "N/A";
      res.render("home.html", { dados, porcentagensCategorias });
    }
  });
}

function calcularPorcentagensPorCategoria(produtos) {
  const contagemCategorias = produtos.reduce((acc, produto) => {
    acc[produto.categoria_produto] = (acc[produto.categoria_produto] || 0) + 1;
    return acc;
  }, {});

  const totalProdutos = produtos.length;
  return Object.keys(contagemCategorias).map((categoria) => ({
    name: categoria,
    y: (contagemCategorias[categoria] / totalProdutos) * 100,
  }));
}

function editarProduto(req, res) {
  let dadosAtualizado = {
    nome_produto:
      typeof req.body.nome_produto === "string" ? req.body.nome_produto : "",
    descricao_produto:
      typeof req.body.descricao_produto === "string"
        ? req.body.descricao_produto
        : "",
    quantidade_produto: req.body.quantidade_produto,
    valor_produto: req.body.valor_produto,
    categoria_produto: req.body.categoria_produto,
    estado_produto: req.body.estado_produto,
  };

  Produto.update(dadosAtualizado, {
    where: {
      id: req.body.id,
    },
  })
    .then(function (sucesso) {
      res.redirect("/listar_produtos");
    })
    .catch(function (erro_atualizar_produto) {
      res.render("editarProduto.html", {
        dadosAtualizado,
        erro_atualizar_produto,
      });
    });
}

function excluirProduto(req, res) {
  const produtoId = req.body.id;

  Produto.destroy({
    where: {
      id: produtoId,
    },
  })
    .then((sucesso) => {
      res.redirect("/listar_produtos?sucesso_excluir=1");
    })
    .catch((erro_excluir_produto) => {
      erro_excluir_produto = true;
      console.log(err);
      res.render("listagemProduto.html", { erro_excluir_produto });
    });
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
  excluirProduto,
  dashboardProduto,
};
