const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
	username: {type:String, required:true},
	email:{type:String, required:true},
	password:{type:String, required:true},
	role:{type:String, required:true},
	firstname:{type:String, required:true},
	lastname:{type:String, required:true},
	gender:{type:String, required:true},
});

module.exports = model('user',UserSchema);