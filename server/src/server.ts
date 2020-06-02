import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Listagem de usuários');
  response.json([
    'Jose Roberto',
    'Norbet',
    'Cleston',
    'Boston'
  ]);
});

app.listen(3333);