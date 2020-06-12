import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';

// (Router) = serve para desacoplar as rotas do arquivo principal
const routes = express.Router();

// instancia das classes
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {

  const items = await knex('items').select('*');
  // como demora um pouco a busca no bd, utilizamos o await

  // serealizando as informações de ulr de imagem para fornecer a nossa aplicação
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });


  return response.json({serializedItems});
});


routes.post('/points', pointsController.create);

export default routes;