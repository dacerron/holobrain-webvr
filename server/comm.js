var Audio = require("./audio.js");
var Comm = (function () {
    //sessions will have info that is relevant to the specific 
    var sessions = {};

    var createSession = function(body, type, server) {
        let session = {};
        session.key = Math.round(Math.random() * 100000); //TODO: this should to avoid collisions
        session.body = body;
        session.roomType = type;
        session.audioStream = Audio.prepareAudioStream(session.key, io);
        return session;
    }

    var init = function (app, io) {
        //add element to session array
        app.put('/teacher/createEducationalSession', (req, res) => {
            let session = createSession(req.body, "edu", io);
            sessions[session.key] = session;
            res.status(200);
            //start binary server for this session's audio
            res.send("" + session.key);
        });

        app.put('/teacher/createBrainCellSession', (req, res) => {
        });

        app.put('/teacher/createFMRISession', (req, res) => {
        });

        app.put('/teacher/createMRISession', (req, res) => {
        });

        //update current session schema to be grabbed by students
        app.post('/teacher/shareEducationalState', (req, res) => {
            sessions[req.body.key] = req.body;
            res.status(200);
            res.send("" + req.body.key);

        });

        app.post('/teacher/shareBrainCellState', (req, res) => {

        });
        app.post('/teacher/shareFMRIState', (req, res) => {

        });
        app.post('/teacher/shareMRIState', (req, res) => {

        });

        //get session from array to update student vis
        app.get('/student/getEducationalState', (req, res) => {
            res.status(200);
            res.send(sessions[req.query.key]);
        });
        app.get('/student/getBrainCellState', (req, res) => {

        });
        app.get('/student/getFMRIState', (req, res) => {

        });
        app.get('/student/getMRIState', (req, res) => {

        });
    }

    return {
        init
    }
})();

module.exports = Comm;