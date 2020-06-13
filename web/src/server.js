import express from 'express';
import sirv from 'sirv';
import session from 'express-session';
import sessionfilestore from 'session-file-store';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const app = express();
const FileStore = new sessionfilestore(session);

app.use(compression({ threshold: 0 }));
app.use(session({
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 31536000
	},
	secret:'cookiesecret',
	store: new FileStore({
		path:'.sessions'
	})
}));
app.use(sirv('static', { dev }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sapper.middleware({
	session: (req,res) => {
		return ({
			token:req.session.token,
			secret:'cookiesecret'
		});
	}
}));

app.listen(PORT);