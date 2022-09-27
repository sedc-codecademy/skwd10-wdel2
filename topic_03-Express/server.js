require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./const/router.const");

const app = express();

// Helps parse the  body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// http://localhost:3000/api/

// Simple API
// Using /api here is NOT mandatory
// app.use("/api", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello from the SEDC API for MEXN",
//   });
// });

app.use("/api", router);

mongoose.connect("mongodb://localhost:27017/tododb").then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on http://localhost:3000/");
  });
});

/*
HTTP Life Path
1. server.js
2. Main Router
3. Feature Router
4. Feature Controller
5. Feature Service (Which communicates with the database)
6. Respond with a Response
*/