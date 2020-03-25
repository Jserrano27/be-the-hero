const knex = require('knex');
const config = require('../../knexfile');

// Estabelece o tipo de conexao (development - staging - production )
const connection = knex(config.development);

module.exports = connection;