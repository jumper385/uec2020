import * as db from '../mongoosehelpers'
import { Announcement } from '../../dbschemas/announcement.js';

const contents = async(collection, query) => {
	const response = await db.queryCollection(collection, query)
	return JSON.stringify(response)
}

export async function get(req, res) {

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(await contents(Announcement, req.params));
}