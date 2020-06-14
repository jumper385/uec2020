import express from 'express';
import sirv from 'sirv';
import * as bodyParser from 'body-parser';
import compression from 'compression';
// import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import sessionFileStore from 'session-file-store';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, MONGODB, AUTH_SERVER} = process.env;
const dev = NODE_ENV === 'development';
const app = express()
const FileStore = new sessionFileStore(expressSession)

app.use(compression({ threshold: 0 }))
app.use(sirv('static', { dev }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressSession({
	secret:'secret',
	cookie:{maxAge:60000 * 60 * 24},
	saveUninitialized: true,
	resave: true,
	store: new FileStore({path:'.sessions'})
}))
app.use(sapper.middleware({
	session: async (req,res) => ({
		token: req.session.token || null,
		authserver: AUTH_SERVER || 'localhost:3003',
	})
}))

app.listen(PORT);