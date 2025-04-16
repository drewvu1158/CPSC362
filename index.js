// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, etc.) from a folder called 'public'
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to get the list of images
app.get('/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'public/images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading images directory:', err);
      return res.status(500).send('Failed to load images');
    }
    const imagePaths = files
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter image files
      .map(file => `/images/${file}`); // Map to public paths
    if (imagePaths.length === 0) {
      console.error('No valid images found in the images directory.');
      return res.status(404).send('No images found');
    }
    res.json(imagePaths);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
