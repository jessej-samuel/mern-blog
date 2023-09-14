const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

require("dotenv").config();

const SALT = bcrypt.genSaltSync(8);
const SECRET = "xyzzzhahah";

const User = require("./models/User");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.body, req.ip);
  next();
});

app.use(cookieParser());

mongoose.connect(process.env.CONN);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, SALT),
    });
    res.json({
      data: {
        userDoc,
      },
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });

  const passed = bcrypt.compareSync(password, userDoc.password);

  if (passed) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong creds");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  console.log("Token: " + token);
  if (!token) res.json({});
  else
    jwt.verify(token, SECRET, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
});

app.post("/logout", (Req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
