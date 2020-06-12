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
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });


  return response.json({serializedItems});
});


routes.post('/points', async (request, response) => {

  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  // transaction = caso uma das querys falhe a outra também não e executada
  const trx = await knex.transaction();

  // após fazer o insert o knex retorna os ids, que neste caso é somente um id
  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  });

  const point_id = insertedIds[0];

  // aqui pegamos o id do points que foi inserido acima, para passar no segund insert que é a chace estrangeira
  // o item_id do map é cada id dos items que foi recebido no request.body (lampada, óleo, etc)
  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id
    };
  })


  await trx('point_items').insert(pointItems);

  return response.json({ success: true });

});

export default routes;