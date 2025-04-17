require('dotenv').config(); // Load .env at the top

console.log("API KEY:", process.env.OPENWEATHER_API_KEY); // TEMP: Test if .env is working

const app = require('./app'); // Import the app
const port = process.env.PORT || 3000; // Get the port number

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
