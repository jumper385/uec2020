// import { queryCollection } from "../../../mongoosehelpers";
// import { Account } from "../../../../dbschemas/accountschema";

export const get = (req,res) => {
    let {token, verified} = req.auth
    if (!verified) res.status(404).json('this page doesn\'t exist...')
    console.log(req.auth)
    res.status(201).json(token)
}