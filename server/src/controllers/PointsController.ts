import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create (request:Request, response:Response) {

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

  }
};

export default PointsController;