import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// (Router) = serve para desacoplar as rotas do arquivo principal
const routes = express.Router();

// instancia das classes
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);


routes.post('/points', pointsController.create);

export default routes;