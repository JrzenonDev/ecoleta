import express from 'express';
import knex from './database/connection';

// (Router) = serve para desacoplar as rotas do arquivo principal
const routes = express.Router();

routes.get('/items', async (request, response) => {

  const items = await knex('items').select('*');
  // como demora um pouco a busca no bd, utilizamos o await

  // serealizando as informações de ulr de imagem para fornecer a nossa aplicação
  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });


  return response.json({serializedItems});
});

export default routes;