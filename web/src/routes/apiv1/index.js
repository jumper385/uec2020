export const get = async(req,res, next) => {
	res.setHeader('Content-Type', 'application/json');
	res.json({message:'Welcome to uec apiv1'});
};