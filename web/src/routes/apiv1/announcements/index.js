import { Announcement } from '../../../dbschemas/announcement';
import * as db from '../../mongoosehelpers';

// HTTP FUNCTIONS
export const get = async (req, res) => {

	console.log(`get w/ ${JSON.stringify(req.params)}`);

	let documents = await db.queryCollection(Announcement, req.params);
	
	res.status(200).json({
		message: 'Successful GET request',
		documentCount: `We have ${documents.length} ${documents.length > 1 ? 'documents' : 'document'}`,
		documents: documents
	});

};

export const patch = async (req, res) => {

	console.log(`patch w/ ${JSON.stringify(req.body)}`);

	let documents = await db.queryCollection(Announcement, req.body);
	
	res.status(200).json({
		message: 'Successful PATCH request',
		documentCount: `We have ${documents.length} ${documents.length > 1 ? 'documents' : 'document'}`,
		documents: documents
	});

};

export const post = async (req, res) => {

	// check the verification
	const { verified, token } = req.auth
	if (!verified) res.status(401).json({error:true, message:'Unauthorized Access'})
	
	try {
		// synthesize the document data
		let newAnnouncement = {
			...req.body,
			author: token.username,
			timestamp: new Date()
		}

		// create the new collection
		let document = await db.postCollection(Announcement, newAnnouncement)
		
		// return a response for the new document
		res.setHeader('Content-Type', 'application/json');
		res.json({
			message: 'Successful POST request',
			documentsSubmitted: document ? document.length || 1 : 0,
			documents: {
				document
			}
		});
		
	} catch (err) {
		res.status(500).json({error:true, message:err.message})
	}
};

export const put = async (req, res) => {
	let {verified, token} = req.auth
	if(!verified) res.status(401).json('unauthorized')
	console.log(`put request w/ ${JSON.stringify(req.body)}`);
	let { query, delta } = req.body;
	let document = await db.editCollection(Announcement, query, delta);
	res.setHeader('Content-Type', 'application/json');
	res.json(document);
};

export const del = async (req, res, next) => {
	console.log(req.headers, req.body)
	let {verified, token} = req.auth
	if(!verified) res.status(401).json('unauthorized')
	console.log(`delete request w/ ${JSON.stringify(req.body)}`);
	res.setHeader('Content-Type', 'application/json');
	res.json(await db.deleteCollection(Announcement, req.body));
	console.log(req.body);
};