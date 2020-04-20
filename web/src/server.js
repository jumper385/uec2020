import express from 'express';
import sirv from 'sirv';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as mongoose from 'mongoose';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const app = express();

mongoose.connect(dev ? 'mongodb://localhost:27017' : 'mongodb://db:27017/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if(err){
		throw err;
	} else {
		console.log('successful db connection');
	}
});

app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sapper.middleware());

app.listen(PORT);