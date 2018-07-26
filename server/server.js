const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();

var Comm = require('./comm.js');
var Env = require('./env.js');
var Audio = require('./audio.js');

app.use('/rooms/public', express.static(path.join(__dirname, 'static/public')));
app.use('/rooms/js/', express.static(path.join(__dirname, 'static//js')));
app.use(bodyParser.json());

Comm.init(app);

app.get('/rooms/brain-cell-teacher', (req, res) => {
    res.sendFile('brainCellRoomTeacher.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/brain-cell-student', (req, res) => {
    res.sendFile('brainCellRoomStudent.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/educational-room-teacher', (req, res) => {
    res.sendFile('educationalRoomTeacher.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/educational-room-student', (req, res) => {
    res.sendFile('educationalRoomStudent.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/fMRI-room-teacher', (req, res) => {
    res.sendFile('fMRIRoomTeacher.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/fMRI-room-student', (req, res) => {
    res.sendFile('fMRIRoomStudent.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/MRI-room-teacher', (req, res) => {
    res.sendFile('MRIRoomTeacher.html', {root: path.join(__dirname, 'static')});
});

app.get('/rooms/MRI-room-student', (req, res) => {
    res.sendFile('MRIRoomStudent.html', {root: path.join(__dirname, 'static')});
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'static')})
});

app.listen(Env.port, () => {
    console.log("the app is listening on port " + Env.port)
});