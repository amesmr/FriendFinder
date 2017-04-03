// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var $ = require('jquery');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
app.use(express.static(__dirname + '/public'));
var friends = [];
var questions = [];

// Routes
// =============================================================
require("./app/routing/htmlRoutes.js")(app, path);
require("./app/routing/apiRoutes.js")(app, fs, friends, questions);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    fileExists("app/data/friends.js", function (err, isFile) {
        if (isFile) {
            fs.readFile("app/data/friends.js", "utf8", function (err, data) {
                var obj = JSON.parse(data);
                for (i = 0; i < obj.length; i++) {
                    friends.push(obj[i]);
                    console.log("Adding " + obj[i].name + " to friends array.");
                }
            });
        }
    });
    fileExists("app/data/questions.js", function (err, isFile) {
        if (isFile) {
            fs.readFile("app/data/questions.js", "utf8", function (err, data) {
                var obj = JSON.parse(data);
                for (i = 0; i < obj.length; i++) {
                    questions.push(obj[i]);
                    console.log("Adding " + obj[i].name + " to questions array.");
                }
            });
        }
    });
});


function fileExists(file, cb) {
    fs.stat(file, function fsStat(err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                return cb(null, false);
            } else {
                return cb(err);
            }
        }
        return cb(null, stats.isFile());
    });
}