import * as mongoose from 'mongoose';

mongoose.connect(process.env.NODE_ENV == development ? 'mongodb://localhost:27017' : 'mongodb://db:27017');
const db = mongoose.connection();