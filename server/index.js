const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./config/dbConnection");
const createnewUser = require("./src/routes/createuserRoute");
// Your server code goes here
app.use(cors());
app.use(express.json());

// Your route api  goes here
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/create", createnewUser);
app.use("/api/", createnewUser);

// server
app.listen(8001, () => {
  console.log("server is running on port 8001");
});
