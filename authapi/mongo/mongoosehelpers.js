const mongoose = require('mongoose')

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(!dev ? 'mongodb://db:27017' : 'mongodb://localhost:27017/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if(err){
		throw err;
	} else {
		console.log('successful db connection');
	}
});

// DATABASE INTERFACE FUNCIONS

module.exports = {
	queryCollection: async (schema, query) => {
		// Queries the schema and finds the data
		return await schema.find(query);
	},
	postCollection: async (schema, body) => {
		// posts a new document
		if(body.length == undefined) return await schema.create(body);
		if(body.length > 1) return await schema.insertMany(body);
	},
	deleteCollection: async (schema, query) => {
		// finds and deletes based on a query
		return await schema.find(query).remove();
	},
	editCollection: async (schema, query, delta) => {
		// finds and edits based on a query
		return await schema.find(query).updateMany({
			$set: {
				...delta
			}
		});
	}
}