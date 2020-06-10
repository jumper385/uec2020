import * as db from '../mongoosehelpers';
import { Announcement } from '../../dbschemas/announcement.js';

export async function get(req, res) {
	const { slug } = req.params;

	const article = db.queryCollection(Announcement, {_id:slug});
	console.log(article);

	if (await article) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(await article);
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: 'Not found'
		}));
	}

}
