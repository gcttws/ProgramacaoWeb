const express = require('express');
const router = express.Router();

const produtoController = require('../controller/produtoController');
const autenticacaoController = require('../controller/autenticacaoController');

router.get('/', produtoController.indexView);
router.get('/home', autenticacaoController.verificarAutenticacao, produtoController.dashboardProduto);
router.get('/api/produtos/novo', autenticacaoController.verificarAutenticacao, produtoController.cadastroProdutoView);
router.get('/api/produtos/editar/:id', autenticacaoController.verificarAutenticacao, produtoController.editarProdutoView);


router.post('/cadastrar_produto', autenticacaoController.verificarAutenticacao, produtoController.cadastrarProduto);
router.get('/listar_produtos',autenticacaoController.verificarAutenticacao, produtoController.listarProdutos);
router.post('/editar_produto', autenticacaoController.verificarAutenticacao, produtoController.editarProduto);
router.post('/excluir_produto/:id', autenticacaoController.verificarAutenticacao, produtoController.excluirProduto);

module.exports = router;