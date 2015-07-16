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
    console.log("Node.js is running on port 6789!");
});

var io = require("socket.io").listen(server);

// Setting the counter to 0 which is
// OUTSIDE of "io.socket.on(...);"
var counter = 0;

io.sockets.on("connection", function(socket) {
    console.log("Sockets are running!");

    // Listens for the "client_count" emit
    // from index.ejs before taking an
    // action on server.js
    socket.on("client_count", function(action) {
        // Increments the counter by 1
        // starting with zero
        counter++;
        console.log(counter);

        // "io.emit(...)" does a
        // full broadcast of this
        // server.js emit so that all
        // clients viewing the website
        // will see "counter" has
        // incremented by 1
        io.emit("server_counter", {response: counter});
    });

    // Listens for a "client_reset_count"
    // emit from index.ejs
    socket.on("client_reset_count", function(action) {

        // Assigns "counter" to zero
        // when the "client_reset_count"
        // emit is sent from index.ejs
        counter = 0;

        // Sends a full broadcast
        // emit from server.js to
        // index.ejs which sets
        // the "zero" property value
        // of "counter" to 0
        io.emit("server_reset_count", {zero: counter});
    });

});