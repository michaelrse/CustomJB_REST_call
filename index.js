const express = require("express");
const dotenv = require("dotenv");
const configJSON = require("./config/config-json");
const activity = require("./js/activity");
const path = require("path");

var app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});


app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'js')));

app.use(express.static(path.join(__dirname, 'config')));

// Test
//app.post("/testpostman", activity.execute);

// JB Routes
app.post("/save", activity.save);
console.log("save");

app.post("/validate", activity.validate);
console.log("validate");

app.post("/publish", activity.publish);
console.log("publish");

app.post("/execute", activity.execute);

app.post("/unpublish", activity.unpublish);

console.log("execute");

// setup config.json route
app.get("/config.json", function (req, res) {

  return res.status(200).json(configJSON(req));
});