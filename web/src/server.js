import express from "express";
import sirv from "sirv";
import * as bodyParser from "body-parser";
import compression from "compression";
// import cookieParser from 'cookie-parser'
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import * as sapper from "@sapper/server";
import jwt from "jsonwebtoken";

import { queryCollection } from "./routes/mongoosehelpers";
import { Account } from "./dbschemas/accountschema";

const { PORT, NODE_ENV, MONGODB, AUTH_SERVER } = process.env;
const dev = NODE_ENV === "development";
const app = express();
const FileStore = new sessionFileStore(expressSession);

app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "secret",
    cookie: { maxAge: 60000 * 60 * 24 },
    saveUninitialized: true,
    resave: true,
    store: new FileStore({ path: ".sessions" }),
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(async (req, res, next) => {
  // if there are no auth headers, just continue to next middleware
  if (req.headers.authorization == undefined) {
    req.auth = { verified: false };
    return next();
  }

  // extract the auth header token (bearer-token method)
  let { authorization } = req.headers;
  let token = authorization.split(" ")[1];

  try {
    // verify the jwt token
    let tokenverify = jwt.verify(token, "key") || false;

    // if the token is verified, we check if the account exists
    if (tokenverify) {
      let { username, email } = tokenverify;

      // query account in the database
      let accountQuery = await queryCollection(Account, {
        username: username,
        email: email,
      });

      // if account doesn't exist, we exit to next middleware
      if (accountQuery.length < 1) {
        req.auth = { verified: false };
        return next();
      }
      
      // split password from the rest of the profile
      let {password, ...profile} = accountQuery[0]._doc

      // return verified signature and token
      req.auth = {
        verified: !!tokenverify,
        token: profile,
      };

      return next();
    }

  } catch (err) {
    req.auth = {
      verified: false,
    };
    return next();
  }
});
app.use(
  sapper.middleware({
    session: async (req, res) => ({
      token: req.session.token || null,
      authserver: AUTH_SERVER || "localhost:3003",
    }),
  })
);

app.listen(PORT);
