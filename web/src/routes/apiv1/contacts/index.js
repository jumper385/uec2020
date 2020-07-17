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