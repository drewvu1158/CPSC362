const app = require('./app'); // Import the app
const port = process.env.PORT || 3000; // Get the port number

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
