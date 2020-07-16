import { queryCollection } from "../../../mongoosehelpers";
import { Account } from "../../../../dbschemas/accountschema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const post = async(req, res) => {
    try {
        // process the request
        let { username, password } = req.body;
        // check if the email/username exists in the database
        let accountQuery = await queryCollection(Account, {
            $or: [{ username: username }, { email: username }],
        });

        // return 401 for missing user
        if (accountQuery.length < 1) {
            res.status(401).json({ error: true, message: "account doesn\t exist" });
        }

        // if account exists, we verify the password is correct
        let pwdverify = await bcrypt.compare(password, accountQuery[0].password);

        // if pwd is incorect, return 401 showing wrong pwd
        if (!pwdverify) {
            res.status(401).json({ error: true, message: "wrong password" });
        }

        // if password is correct, return jwt token containing the account details
        if (pwdverify) {
            res.status(201).json(jwt.sign({ username: accountQuery[0].username, email: accountQuery[0].email }, "key"));
        }
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
};