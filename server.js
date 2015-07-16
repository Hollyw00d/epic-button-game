// require express and path
var express = require("express");
var path = require("path");

// Create express app
var app = express();

// Static content
app.use(express.static(path.join(__dirname + "/static")));

// Setting up ejs and view directory
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

// Rooute route to rend the index.ejs view
app.get("/", function(req, res) {
    res.render("index");
});

// Express is listening on port 6789
var server = app.listen(6789, function() {
    console.log("Node.js is running!");
});