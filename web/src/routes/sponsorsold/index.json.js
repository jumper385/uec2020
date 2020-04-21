import * as db from '../mongoosehelpers.js'
import { Announcement } from '../../dbschemas/announcement';

export const get = async(req,res) => {
    res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(await db.queryCollection(Announcement, req.body));
}