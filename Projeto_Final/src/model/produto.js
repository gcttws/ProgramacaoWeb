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
    nome_produto: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    descricao_produto: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    quantidade_produto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_produto: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
    },
    categoria_produto:{
        type: Sequelize.ENUM,
        values: (['eletrônico', 'eletrodoméstico','vestuário', 'alimento']),
        allowNull: false
    },
    estado_produto: {
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