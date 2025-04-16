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
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Failed to load the homepage');
    }
  });
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
app.listen(port, '0.0.0.0', () => { // Ensure the server binds to all network interfaces
  console.log(`Website running at http://localhost:${port}`);
});
