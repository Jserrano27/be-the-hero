const express = require('express');

const OngController = require('./database/controllers/OngController');
const ProfileController = require('./database/controllers/ProfileController');
const IncidentController = require('./database/controllers/IncidentController');
const SessionController = require('./database/controllers/SessionController');

const routes = express.Router();

/**
 * Tipos de parametros da requisiçao:
 * 
 * Query Params: Parametros nomeados enviados na rota apos "?" (Filtros, Paginaçao, etc)
 *   request.query
 * 
 * Route Params: Parametros utilizados para idenfiticar recursos (url/usuarios/ID)
 *   requests.params
 * 
 * Request Body: Corpo da requisicao, utilizado para criar ou alterar recursos
 *   request.body
 */

/**
 * SQL: MySQL, SQLite, PostreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc.
 */

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index); 

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);




module.exports = routes;