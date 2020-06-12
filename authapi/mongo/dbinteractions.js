const mongoose = require('mongoose');

mongoose.connect(process.env.NODE_ENV !== 'development' ? 'mongodb://db:27017' : 'mongodb://localhost:27017/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if(err){
		throw err;
	} else {
		console.log('successful db connection');
	}
});