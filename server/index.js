const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./config/dbConnection");

// Your server code goes here
app.use(cors());
app.get("hellow")
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8001, () => {
  console.log("server is running on port 8001");
});
