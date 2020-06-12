require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./mongo/UserSchema');
const db = require('./mongo/mongoosehelpers');

const saltrounds = 10;
const app = express();	
const jwtkey = process.env.NODE_ENV === 'development' ? 'secretkey' : process.env.JWT_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
	res.json({message:'welcome to the authentication api'});
});

app.post('/profile', async (req,res) => {
	try{
		const findUser = await User.find({$or:[
			{username:req.body.username},{email:req.body.email}
		]});

		if (findUser.length < 1){
			const newProfile = User.create({...req.body, password: await bcrypt.hash(req.body.password, saltrounds)});
			res.json(await newProfile);
		} else {
			throw Error('User already exists');
		}

	} catch (err) {
		console.log(err);
		res.status(500).json({error:true,message:err.message});
	}
});

app.post('/login', async (req,res) => {
	try {

		const {username, password} = req.body;

		const userquery = await db.queryCollection(User, {$or:[{username:username}, {email:username}]});
		if (userquery.length < 1) res.status(401).json({error:true, message:'incorrect username...'});

		const comparepwd = await bcrypt.compare(password, userquery[0].password);
		if (!comparepwd) res.status(401).json({error:true, message:'incorrect login...'});
		
		if (comparepwd) {
			let profile = userquery.map(({firstname, lastname, username, email}) => ({firstname, lastname, username, email}));
			let token = jwt.sign({...profile[0]}, jwtkey, {expiresIn:'24h'});
			res.status(200).json({message:'successful login', jwt:await token});
		}

	} catch (err) {
		res.status(500).json({error:true, message:err.message});
	}
});

app.get('/verify', async (req,res) => {
	try{
		let token = req.headers.authorization.split(' ')[1];
		let verify = await jwt.verify(token, jwtkey);
		res.status(200).json(verify);
	} catch (err) {
		res.status(500).json({error:true, message:err.message});
	}
});

app.listen(3000, () => console.log('new connection'));