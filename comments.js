// Create web server
// Run with node comments.js
// Access with http://localhost:3000
// Comments are stored in a SQLite database

// Import the express module
const express = require('express')
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser')

// Create a new express application
const app = express()
app.use(bodyParser.json())

// Create a new database
const db = new sqlite3.Database('comments.db')

// Create a new table in the database
db.run('CREATE TABLE IF NOT EXISTS comments (comment TEXT)')

// Create a new route
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, world!')
})

// Create a new route
app.get('/comments', (req, res) => {
  // Query the database for all comments
  db.all('SELECT comment FROM comments', (err, rows) => {
    // Send a response to the client
    res.json(rows)
  })
})

// Create a new route
app.post('/comments', (req, res) => {
  // Insert a new comment into the database
  db.run('INSERT INTO comments (comment) VALUES (?)', req.body.comment, (err) => {
    // Send a response to the client
    res.send('Comment added')
  })
})

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})