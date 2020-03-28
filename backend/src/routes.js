const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const tokenController = require('./controllers/tokenController');

const verifyJWT = require('./utils/verifyJWT');

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

routes.post('/sessions', celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().length(8)
      })
    }), SessionController.create)

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().min(10).max(11).required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

routes.get('/profile', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
      }).unknown()
    }), verifyJWT, ProfileController.index); 

routes.get('/incidents', celebrate({
  [Segments.QUERY]: {
    page: Joi.number()
  }
}),IncidentController.index);

routes.post('/incidents', celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(20),
        value: Joi.number().required()
      }),
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
      }).unknown()
    }), verifyJWT, IncidentController.create);

routes.delete('/incidents/:id', celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required()
      },
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
      }).unknown()
    }), verifyJWT, IncidentController.delete);

routes.get('/token', celebrate({
  [Segments.HEADERS]: Joi.object({
    'authorization': Joi.string().required(),
    'x-access-token': Joi.string().required()
  }).unknown()
}), tokenController.verify);




module.exports = routes;