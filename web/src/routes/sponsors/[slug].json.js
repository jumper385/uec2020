import * as db from '../mongoosehelpers';
import { Announcement } from '../../dbschemas/announcement.js';

export async function get(req, res) {
	const { slug } = req.params;
	const posts = await db.queryCollection(Announcement, {shortid:slug});
	
	if (posts[0]) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(posts[0]));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: 'Not found'
		}));
	}
}
