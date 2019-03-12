// Import express, body parser, mongoose
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Initialize app
let app = express();

// Import routes
let apiRoutes = require("./routes/api-routes");

// Configure body parser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/myRetailAPI');

// Use API routes in the App
app.use('/api', apiRoutes);

// Set server port to 8080
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('myRetail API'));

// app listen on port 8080
app.listen(port, function () {
     console.log("myRetailAPI listening on port " + port);
});