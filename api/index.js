const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SALT = bcrypt.genSaltSync(8);

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.body, req.ip);
  next();
});

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

  res.json(passed);
});

app.listen(4000);
