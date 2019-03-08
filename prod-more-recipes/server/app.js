import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import router from './routes';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  register home routes
const clientRoute = express.Router();
clientRoute.get([
  '/',
  '/catalog',
  '/dashboard',
  '/dashboard/favorites',
  '/recipe/:recipeId',
], (req, res) => (
  res.sendFile('index.html', { root: `${__dirname}/../dist` })
));


app.use(clientRoute);
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

//  specify routes to be attached to the express instance
//  register endpoints route here
app.use('/api/v1', router);

const route404 = express.Router();
route404.all('*', (req, res) => (
  res.sendFile('404.html', { root: `${__dirname}/../dist` })
));
app.use(route404);

const port = process.env.PORT || 8081;
app.listen(port);
export default app;
