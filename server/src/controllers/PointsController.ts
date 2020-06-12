import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async show (request: Request, response: Response) {

    const { id } = request.params; // forma desestruturada
    // const id = request.params.id; = forma convencional

    const point = await knex('points').where('id', id).first();

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id);

    return response.json({ point, items });

  }

  async create (request: Request, response: Response) {

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

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };

    // após fazer o insert o knex retorna os ids, que neste caso é somente um id
    const insertedIds = await trx('points').insert(point);

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

    return response.json({
      id: point_id,
      ... point, // stred operator = pega todas informações que tem dentro de um objeto
    });

  }

};

export default PointsController;