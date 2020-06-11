import * as db from '../mongoosehelpers'
import { Announcement } from '../../dbschemas/announcement.js';

const posts = async() => {
	const data = await db.queryCollection(Announcement);
	data.forEach(post => {
		post.content = post.content.replace(/^\t{3}/gm, '');
	});
	return JSON.stringify(data);
};

export default posts;
