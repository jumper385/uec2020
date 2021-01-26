import { queryCollection, postCollection, deleteCollection } from "../../mongoosehelpers";
import { Comittee } from "../../../dbschemas/comitteeschema";

export const get = async (req,res) => {
	let committee = await queryCollection(Comittee, {});
	res.json(committee);
};

export const post = async (req,res) => {

	console.log('new request!')

	let { verified } = req.auth;
	if (!verified) res.status(401).json({message:"Unauthorized Access"});

	await deleteCollection(Comittee, {})
	let writecomittee = await postCollection(Comittee, req.body)
	
	res.json(writecomittee);
};

