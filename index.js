// Import express
let express = require('express');

// Initialize app
let app = express();

// Set server port to 8080
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// app listen on port 8080
app.listen(port, function () {
     console.log("myRetailAPI listening on port " + port);
});