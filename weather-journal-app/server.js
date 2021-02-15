// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();
const port = 3000;
const server = app.listen(port, () => {
    console.log(`The port that the server running on is port :${port}`);
});
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());
app.use(express.static("website"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/GetData", (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

app.post("/postData", (req, res) => {
    projectData.push(req.body.City);
    projectData.push(req.body.feeling);
    projectData.push(req.body.temp);
    res.send(projectData);
    return req.body;
});