import express from 'express';
import sirv from 'sirv';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const app = express();

app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sapper.middleware());

app.listen(PORT);