require("dotenv").config();
const express = require("express"); // import express app
const cors = require("cors");
const db = require("./db");

const app = express(); // create an instance of express app and store it in the app variable
app.use(cors());
app.use(express.json()); //any time u want to access data from client side, this allows access to req.body

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// homepage route
app.use("/home", require("./routes/home"));

app.listen(5000, () => {
  console.log("server is up and listening on port", 5000);
});
