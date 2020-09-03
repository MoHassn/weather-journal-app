// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const port = 8000;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

app.listen(port, () => {
  console.log(`the app is listening at http://localhost:${port}`);
});

app.get("/data", (req, res) => {
  res.send(projectData);
});

app.post("/updateData", (req, res) => {
  projectData = req.body;
});
