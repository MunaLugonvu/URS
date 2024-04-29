const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000; 

// Enable CORS middleware
app.use(cors());


// Connect to SQLite database
const db = new sqlite3.Database('user.db');

// Middleware to parse JSON bodies
app.use(express.json());

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'An error occurred while registering the user' });
      } else {
        // Insert user data (including hashed password) into the database
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        
        db.run(sql, [username, email, hash], (err) => {
          if (err) {
            console.error('Error inserting user into database:', err);
            res.status(500).json({ error: 'An error occurred while registering the user' });
          } else {
            console.log('User registered successfully');
            res.sendStatus(200);
          }
        });
      }
    });
  });

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the users table to find a user with the provided username and password
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
      } else {
        if (row) {
          // User with matching credentials found, login successful
          console.log('Login successful');
          res.status(200).json({ message: 'Login successful', user: row });
        } else {
          // No user found with provided credentials, login failed
          console.log('Invalid username or password');
          res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    });
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
