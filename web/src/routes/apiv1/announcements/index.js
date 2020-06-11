import { Announcement } from '../../../dbschemas/announcement';
import * as db from '../../mongoosehelpers';

// HTTP FUNCTIONS
export const get = async (req, res) => {

	console.log(`get w/ ${JSON.stringify(req.body)}`);

	let documents = await db.queryCollection(Announcement, req.body);

	res.setHeader('Content-Type', 'application/json');
	res.json({
		message: 'Successful GET request',
		documentCount: `We have ${documents.length} ${documents.length > 1 ? 'documents' : 'document'}`,
		documents: documents
	});
};

export const post = async (req, res) => {
	// TODO: Add auth protection
	console.log(`post request w/ ${JSON.stringify(req.body)}`);
	let document = await db.postCollection(Announcement, req.body);
	res.setHeader('Content-Type', 'application/json');
	res.json({
		message: 'Successful POST request',
		documentsSubmitted: document ? document.length || 1 : 0,
		documents: {
			document
		}
	});
};

export const put = async (req, res) => {
	// TODO: Add auth protection
	console.log(`put request w/ ${JSON.stringify(req.body)}`);
	let { query, delta } = req.body;
	let document = await db.editCollection(Announcement, query, delta);
	res.setHeader('Content-Type', 'application/json');
	res.json(document);
};

export const del = async (req, res, next) => {
	// TODO: Add auth protection
	console.log(`delete request w/ ${JSON.stringify(req.body)}`);
	res.setHeader('Content-Type', 'application/json');
	res.json(await db.deleteCollection(Announcement, req.body));
	console.log(req.body);
};