const express = require('express');
const router = express.Router();

const autenticacaoController = require('../controller/autenticacaoController');
const usuarioController = require('../controller/usuarioController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
router.get('/home', autenticacaoController.verificarAutenticacao, usuarioController.homeViewUsuario)
router.get('/api/usuarios', autenticacaoController.verificarAutenticacao, usuarioController.listarUsuarios);
router.get('/api/usuario/editar/:id', autenticacaoController.verificarAutenticacao, usuarioController.editarUsuarioView);


router.post('/editar_usuario', autenticacaoController.verificarAutenticacao, usuarioController.editarUsuario);
module.exports = router;