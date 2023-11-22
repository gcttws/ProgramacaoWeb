const express = require('express');
const router = express.Router();

const produtoController = require('../controller/produtoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', produtoController.indexView);
router.get('/home', autenticacaoController.verificarAutenticacao, produtoController.homeView);
router.get('/api/produtos/novo', autenticacaoController.verificarAutenticacao, produtoController.cadastroProdutoView);
router.get('/api/produtos', autenticacaoController.verificarAutenticacao, produtoController.listagemProdutoView);
router.get('/api/produtos/editar', autenticacaoController.verificarAutenticacao, produtoController.editarProdutoView);


router.post('/cadastrar_produto', autenticacaoController.verificarAutenticacao, produtoController.cadastrarProduto);
router.post('/listar_produtos', autenticacaoController.verificarAutenticacao, produtoController.listarProdutos);
router.post('/excluir_produtos', autenticacaoController.verificarAutenticacao, produtoController.excluirProduto);

module.exports = router;