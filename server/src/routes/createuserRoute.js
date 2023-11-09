const express = require("express");
const pool = require("../../config/dbConnection");
const router = express.Router();
const jwt = require("jsonwebtoken")

// Route to create a new user
router.post("/", (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate the input data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Check if the email already exists in the database
    pool.query(
      "SELECT * FROM create_user WHERE email = ?",
      [email],
      (selectErr, selectResult) => {
        if (selectErr) {
          console.error("Error while checking email availability:", selectErr);
          return res
            .status(500)
            .json({ message: "An error occurred during user creation" });
        }
  
        if (selectResult.length > 0) {
          return res.status(409).json({ message: "Email already exists" });
        }
        // If the email is not in the database, insert the new user
        pool.query(
          "INSERT INTO create_user (name, email, password) VALUES (?, ?, ?)",
          [name, email, password],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error while inserting a new user:", insertErr);
              return res
                .status(500)
                .json({ message: "An error occurred while creating the user" });
            }
  
            return res.status(200).json({ message: "User created successfully" });
          }
        );
      }
    );
  });

// Route to handle user login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Check the user's credentials in the database
    pool.query(
      "SELECT * FROM create_user  WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) {
          console.error("Error while checking user credentials:", err);
          return res
            .status(500)
            .json({ message: "An error occurred during login" });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ message: "Authentication failed" });
        }
  
        // User authenticated; generate a JWT token
        const user = results[0]; // Get the user's information from the query results
        const token = jwt.sign({ email: user.email }, "shekhar_@123", {
          expiresIn: "1h",
        });
  
        res.status(200).json({
          name: user.name,
          email: user.email,
          token,
        });
      }
    );
  });

module.exports = router;