require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const User = require("./mongo/UserSchema");
const db = require("./mongo/mongoosehelpers");

const saltrounds = 10;
const app = express();
const jwtkey =
  process.env.NODE_ENV === "development" ? "secretkey" : process.env.JWT_KEY;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "welcome to the authentication api" });
});

app.post("/profile", async (req, res) => {
  try {
    const findUser = await User.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (findUser.length < 1) {
      const newProfile = User.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, saltrounds),
      });
      res.json(await newProfile);
    } else {
      throw Error("User already exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userquery = await db.queryCollection(User, {
      $or: [{ username: username }, { email: username }],
    });
    if (userquery.length < 1)
      res.status(401).json({ error: true, message: "incorrect username..." });

    const comparepwd = await bcrypt.compare(password, userquery[0].password);
    if (!comparepwd)
      res.status(401).json({ error: true, message: "incorrect login..." });

    if (comparepwd) {
      console.log("successful login attempt")
      let profile = userquery.map(
        ({ firstname, lastname, username, email }) => ({
          firstname,
          lastname,
          username,
          email,
        })
      );
      let token = jwt.sign({ ...profile[0] }, jwtkey, { expiresIn: "24h" });
      res.status(201).json(token)
    }
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.get("/verify", async (req, res) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) res.status(401).json({message:'unauthorized access...'})

    let verify = await jwt.verify(token, jwtkey);
    if (!verify) res.status(401).json({message:'unauthorized access...'})

    const userexist = await db.queryCollection(User, { email:verify.email, username:verify.username })
    if (userexist) res.status(201).json(userexist[0])

    else res.status(401).json({message:'unauthorized access...'})
    
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
