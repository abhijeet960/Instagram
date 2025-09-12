const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: "Invaild Data",
      });
    }

    const { email, username, password } = req.body;

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password// password: hashpass,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
        message: "Invaild Data",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }
    const JWT_SECRET = "max-furiosa";

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
    );
    res.cookie("token", token);
    res.send("Logged In");
  }
);




module.exports = router;
