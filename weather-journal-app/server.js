// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();
const port = 3000;
const server = app.listen(port, listening);
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static("website"));
app.use(cors());
app.options("*", cors());

// Setup Server
app.use(express.static("website"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});