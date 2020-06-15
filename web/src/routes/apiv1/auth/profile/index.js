import bcrypt from "bcrypt";
import { queryCollection } from "../../../mongoosehelpers";
import { Account } from "../../../../dbschemas/accountschema";
const saltrounds = 10;

export const get = async (req, res) => {
  try {
    // get verification signature
    const { verified, token } = req.auth;
    // return error if verification fails
    if (!verified) {
      res.status(401).json({ error: true, message: "invalid token/auth" });
    }

    // return the user data if good verification signature
    let { username, email } = token;
    let accountQuery = await queryCollection(Account, {
      username: username,
      email: email,
    });
    if (accountQuery.length < 1) throw Error("could not find the user...");

    // return the user data
    let account = accountQuery[0];

    res.json({
      username: account.username,
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
    });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

export const post = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const accountQuery = await queryCollection(Account, {
      $or: [{ email: email }, { username: username }],
    });

    if (accountQuery.length > 0)
      res.status(409).json({ error: true, message: "account already exists" });

    const pwdhash = await bcrypt.hash(password, saltrounds);

    const jwt = "secretkey";

    const newAccount = Account.create({
      ...req.body,
      password: pwdhash,
    });

    res.json(await newAccount);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

export const put = async (req, res) => {
  const { verified, token } = req.auth;
  console.log(verified);
};
