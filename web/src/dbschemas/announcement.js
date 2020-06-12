import { Schema, model} from 'mongoose';
import shortid from 'shortid'

const announcementSchema = Schema({
	title: { type: String, required: true },
	content: { type: String },
	author: { type: String, required: true },
	timestamp: { type: Date, default: new Date(), required:true },
	summary: {type: String },
	company: {type: String},
	link: {type: String},
	shortid: {type: String, required:true, default: shortid.generate()}
});

export const Announcement = model('announcement', announcementSchema);