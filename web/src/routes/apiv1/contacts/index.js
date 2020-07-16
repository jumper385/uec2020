import * as db from '../../mongoosehelpers';
import { Account } from '../../../dbschemas/accountschema'

export const get = async (req, res) => {
	let accounts = await db.queryCollection(Account, {role:'committee'});

	let contactInfo = accounts.map(profile => {
		let { password, username, _id, ...contact} = profile._doc
		
		let rolearray = contact.role.filter(role => {
			return role != 'committee' && role != 'executive' && role
		})
		
		return {...contact, role:rolearray}
	})
	
	res.json(contactInfo)
};

export const post = async (req, res) => {
	// TODO: Add auth protection
	let document = await db.postCollection(Contact, req.body);
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
	let { query, delta } = req.body;
	let document = await db.editCollection(Contact, query, delta);
	res.setHeader('Content-Type', 'application/json');
	res.json(document);
};

export const del = async (req, res, next) => {
	// TODO: Add auth protection
	res.setHeader('Content-Type', 'application/json');
	res.json(await db.deleteCollection(Contact, req.body));
};