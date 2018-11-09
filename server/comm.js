var Comm = (function () {
    //sessions will have info that is relevant to the specific
    var sessions = {};

    var createSession = function()  {
        var session = {};
        session.key = Math.round(Math.random() * 100000)+""; //TODO: this should to avoid collisions
        session.studentSockets = [];
        return session;
    }

    var addStudentToSession = function(sessionNumber, socket) {
        if(sessions[sessionNumber]) {
            sessions[sessionNumber].studentSockets.push(socket);
        }
    }

    var sendStateToStudents = function(sessionNumber, state) {
        let sockets = sessions[sessionNumber].studentSockets;
        for(socket of sockets) {
            socket.emit('studentShareState', {state: state});
        }
    }

    var init = function (io) {
        io.on('connection', (socket) => {
            socket.on('teacherJoin', function() {
                console.log('teacher joining');
                try{
                    let session = createSession();
                    sessions[session.key] = session;
                    socket.emit('teacherSessionCreated', {key: session.key});
                } catch (e) {
                    console.log('failed to create session on teacher join');
                    socket.emit('teacherSessionCreateFailed', {error: 'failed to create session'})
                }
            });

            socket.on('studentJoin', function(data) {
                console.log("student joining: " + data.key)
                data.key ? addStudentToSession(data.key, socket) : null
            })

            socket.on('teacherShareState', function(data) {
                data.key && data.state ? sendStateToStudents(data.key, data.state) : null
            })
            socket.emit('ready');
        });
    }

/*
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

        app.post('/teacher/eduAudio', (req, res) => {
            sessions[req.body.key].audioBuffer.push(req.body.chunk);
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
    */

    return {
        init
    }
})();

module.exports = Comm;
