import express, { json } from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(json());
app.use(routes);

// utilizado para servir arquivos estáticos na aplicação (função do exprees)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


app.listen(3333);