import express from 'express';
import knex from './database/connection';

// (Router) = serve para desacoplar as rotas do arquivo principal
const routes = express.Router();

routes.get('/items', async (request, response) => {

  const items = await knex('items').select('*');
  // como demora um pouco a busca no bd, utilizamos o await


  return response.json({items});
});

export default routes;