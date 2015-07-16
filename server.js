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

app.get("/reset", function(req, res) {
    res.redirect("/");
});

// Express is listening on port 6789
var server = app.listen(6789, function() {
    console.log("Node.js is running!");
});

var io = require("socket.io").listen(server);

// Setting the counter to 0
var counter = 0;

io.sockets.on("connection", function(socket) {
    console.log("Sockets are running!");

    socket.on("client_count", function(action) {
        counter++;
        console.log(counter);

        io.emit("server_counter", {response: counter});
    });






    socket.on("client_reset_count", function(action) {
        counter = 0;

        io.emit("server_reset_count", {zero: counter});
    });





















});