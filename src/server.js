const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const compression = require('compression');

const app = express();

var server = http.Server(app);
var io = require('socket.io')(server);
var Comm = require('./comm.js');
var Env = require('./env.js');

app.use(compression());

app.get('/rooms/educational-room-teacher', (req, res) => {
    res.sendFile('educationalRoomTeacher.html', {root: path.join(__dirname, 'public/html')});
});

app.get('/rooms/educational-room-student', (req, res) => {
    res.sendFile('educationalRoomStudent.html', {root: path.join(__dirname, 'public/html')});
});

app.get('/js/:name', function(req, res) {
    var options = {
        root: __dirname + '/public/js/',
    }
    var fileName = req.params.name;
    console.log("sending " + fileName);
    res.sendFile(fileName, options, function(err) {
        if(err) {
            console.log(err.message);
        }
    });
});

app.get('/assets/:name', function(req, res) {
    var options = {
        root: __dirname + '/public/assets/',
    }
    var fileName = req.params.name;
    console.log("sending: " + fileName);
    res.sendFile(fileName, options, function(err) {
        if(err) {
            console.log(err.message);
        } else {
            console.log("done with " + fileName);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')})
});

//Comm.init(io);

server.listen(Env.port, Env.addr_local, () => {
    console.log("the app is listening on port " + Env.port);
});
