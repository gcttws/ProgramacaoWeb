const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario')

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco_custo: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
    },
    preco_venda: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
    },
    categoria:{
        type: Sequelize.ENUM,
        values: (['eletrônico', 'eletrodoméstico','vestuário', 'alimento']),
        allowNull: false
    },
    estado: {
        type: Sequelize.ENUM,
        values: (['avariado', 'funcional', 'manutenção'])
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
});

Produto.belongsTo(Usuario, {foreignKey: 'usuario_id'});

module.exports = Produto;