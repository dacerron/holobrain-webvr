var Comm = (function () {
    //sessions will have info that is relevant to the specific
    var sessions = {};

    var createSession = function()  {
        let session = {};
        session.key = Math.round(Math.random() * 100000); //TODO: this should to avoid collisions
        session.studentSockets = {};
        return session;
    }

    var addStudentToSession = function(sessionNumber, socketId, socket) {
        if(sessions[sessionNumber]) {
            sessions[sessionNumber].studentSockets[socketId] = socket;
        }
    }

    var sendCommandToStudents = function(sessionNumber, command) {
        let sockets = sessions[sessionNumber].studentSockets;
        for(socket of sockets) {
            socket.emit('studentCommand', {command: command});
        }
    }

    var init = function (io) {
        io.on('connection', (socket) => {
            socket.emit('ready');
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
                data.id ? addStudentToSession(data.id, socket.id, socket) : null
            })

            socket.on('teacherCommand', function(data) {
                console.log("got command: " + data.command);
                data.id && data.command ? sendCommandToStudents(data.id, data.command) : null
            })
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
