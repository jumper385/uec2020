require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('./mongo/UserSchema');
const Database = require('./mongo/dbinteractions');

const saltrounds = 10;
const sampleHash = bcrypt.hash('st18chenh', saltrounds);
const sampleUser = 'chenry';
const app = express();	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
	res.json({message:'welcome to the authentication api'});
});

app.post('/profile', async (req,res) => {
	try{
		if (req.body.password && req.body.username) {
			const pwdhash = bcrypt.hash(req.body.password, saltrounds);
			const newProfile = User.create({
				...req.body,
				password: await pwdhash
			});
			
			res.json(await newProfile);
		} else {
			res.status(400).json({message: 'missing key elements of profile'});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({error:'error',errmsg:err});
	}
});

app.post('/login', async (req,res) => {
	const {username, password} = req.body;
	const userExists = username == sampleUser;
	const correctlogin = await bcrypt.compare(password, await sampleHash);

	res.json(userExists && correctlogin ? {message:'Successful Login'} : {message: 'Login Failed...'});
});

app.listen(3000, () => console.log('new connection'));