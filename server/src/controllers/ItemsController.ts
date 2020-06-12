import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index (request: Request, response: Response) {

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
  }
};

export default ItemsController;