// import { queryCollection } from "../../../mongoosehelpers";
// import { Account } from "../../../../dbschemas/accountschema";

export const post = (req,res) => {
    let {token, verified} = req.auth
    let {permissions} = req.body

    console.log(req.body, permissions)

    if (!verified) res.status(401).json('unauthorized access')
    if (!!token && !token.role.includes(permissions)) res.status(401).json('unauthorized access')
    console.log(token.role, permissions)
    res.status(201).json(token)
}