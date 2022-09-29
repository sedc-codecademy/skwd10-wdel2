//Dotenv must be used on th first line in the project
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./const/router.const");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api", router);

mongoose.connect("mongodb://localhost:27017/tododb").then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:3000/");
  });
});
