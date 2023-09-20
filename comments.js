// Create web server

// 1. npm init -y
// 2. npm install express
// 3. node comments.js
// 4. open browser and go to http://localhost:3000/comments

const express = require('express'); // import express
const app = express(); // create an instance of express

// create a route
app.get('/comments', (req, res) => {
    res.send('comments');
});

// start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 