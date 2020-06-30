// import { queryCollection } from "../../../mongoosehelpers";
// import { Account } from "../../../../dbschemas/accountschema";

export const post = (req,res) => {
    let {token, verified} = req.auth
    let {permissions} = req.body

    console.log(req.body, permissions)

    if (!verified) res.status(401).json('unauthorized access')
    
    if (!!token) {
        let roleAllowed = token.role.some(accountRole => {
            console.log(accountRole)
            return permissions.includes(accountRole)
        })
        if (!roleAllowed) res.status(401).json('unauthorized access')
    }

    // console.log(token.role, permissions)
    res.status(201).json(token)
}