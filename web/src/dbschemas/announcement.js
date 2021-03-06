import { Schema, model} from 'mongoose';

const announcementSchema = Schema({
	title: { type: String, required: true },
	content: { type: String },
	author: { type: String, required: true },
	timestamp: { type: Date, default: new Date(), required:true },
	summary: {type: String, required: true},
	company: {type: String, required: true},
	link: {type: String},
});

export const Announcement = model('announcement', announcementSchema);