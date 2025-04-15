// server.js
const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, etc.) from a folder called 'public'
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
