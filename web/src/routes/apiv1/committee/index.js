import { queryCollection, postCollection } from "../../mongoosehelpers";
import { Comittee } from "../../../dbschemas/comitteeschema";

export const get = async (req,res) => {
	let committee = await queryCollection(Comittee, {});
	res.json(committee);
};

export const post = async (req,res) => {
	let { verified } = req.auth;
	if (!verified) res.status(401).json({message:"Unauthorized Access"});

	let queryPosition = await queryCollection(Comittee, {position:req.body.position});

	if (queryPosition.length < 1) {
		let createPosition = await postCollection(Comittee, req.body);
		res.status(200).json(createPosition);
	} else {
		res.status(500).json({message:"Committee Position already exists"});
	}

};

