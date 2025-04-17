// Set up the server and connect everything.

const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./weatherRoutes');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Enable JSON body parsing
app.use(weatherRoutes); // Use the weather routes

module.exports = app;
