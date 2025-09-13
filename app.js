const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");
const dotenv = require("dotenv").config;
const cookieParser = require("cookie-parser");
const user = require("./models/user.model");
const cors = require('cors');


const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use("/", indexRouter);
app.get("/get", async (req, res) => {
  try {
    const allUser = await user.find({})
    res.send({ status: "ok", data: allUser })
  } catch (error) {
    console.log(error);

  }
})

app.listen(3000);
