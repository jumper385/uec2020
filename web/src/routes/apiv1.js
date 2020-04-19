import { Announcement } from '../dbschemas/announcement';

// HTTP FUNCTIONS
export const get = async (req, res) => {

	let documents = await queryCollection(Announcement, req.body);

	res.setHeader('Content-Type', 'application/json');
	res.json({
		message: 'Successful GET request',
		documentCount: `We have ${documents.length} ${documents.length > 1 ? 'documents' : 'document'}`,
		documents: { ...documents }
	});
};

export const post = async (req, res) => {
	// TODO: Add auth protection
	let document = await postCollection(Announcement, req.body);
	console.log(document);
	res.setHeader('Content-Type', 'application/json');
	res.json({
		message: 'Successful POST request',
		documentsSubmitted: `${document.length} ${document.length > 1 ? 'documents' : 'document'} was submitted`, 
		documents: {
			document
		}
	});
};

export const put = async (req, res) => {
	// TODO: Add auth protection
	let { query, delta } = req.body;
	let document = await editCollection(Announcement, query, delta);
	console.log(document);
	res.setHeader('Content-Type', 'application/json');
	res.json(document);
};

export const del = async (req, res, next) => {
	// TODO: Add auth protection
	res.setHeader('Content-Type', 'application/json');
	res.json(await deleteCollection(Announcement, req.body));
};