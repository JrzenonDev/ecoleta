import express from 'express';

// serve para desacoplar as rotas do arquivo principal
const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({message: 'Hello World!'});
});

export default routes;