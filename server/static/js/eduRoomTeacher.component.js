AFRAME.registerComponent('eduroomteacher', {
    schema: { type: 'vec3' },

    init: function () {
        this.sessionKey;

        //TODO: extend this function if we want to support more browsers
        this.makeXHR = function () {
            return new XMLHttpRequest();
        };

        this.sendState = function () {
            return new Promise(function (resolve, reject) {
                var req = this.makeXHR();
                req.open('POST', '/teacher/shareEducationalState');
                req.onload = function () {
                    if (req.status === 200) {
                        resolve();
                    } else {
                        console.log("failed to update state");
                        reject();
                    }
                };
                req.setRequestHeader('Content-Type', 'application/json');
                let state = this.readState();
                let key = this.sessionKey;
                req.send(JSON.stringify({
                    state: state,
                    key: key,
                }));
            }.bind(this));
        }.bind(this);

        this.readState = function () {
            let brainParts, generalPos, generalRot, ventricles, ventriclesPos, ventriclesRot, ventriclesCol, thalamus, thalamusPos, thalamusRot, thalamusCol,
                subthalamic, subthalamicPos, subthalamicRot, subthalamicCol, lCaudate, lCaudatePos, lCaudateRot, lCaudateCol, lPutamen, lPutamenPos, lPutamenRot, lPutamenCol,
                lSubstantiaNigra, lSubstantiaNigraPos, lSubstantiaNigraRot, lSubstantiaNigraCol, lGlobusPallidus, lGlobusPallidusPos, lGlobusPallidusRot, lGlobusPallidusCol,
                rCaudate, rCaudatePos, rCaudateRot, rCaudateCol, rPutamen, rPutamenPos, rPutamenRot, rPutamenCol, rSubstantiaNigra, rSubstantiaNigraPos, rSubstantiaNigraRot, rSubstantiaNigraCol,
                rGlobusPallidus, rGlobusPallidusPos, rGlobusPallidusRot, rGlobusPallidusCol;
            brainParts = document.querySelector("#isolated-brain-parts");
            generalPos = brainParts.getAttribute("position");
            generalRot = brainParts.getAttribute("rotation");
            ventricles = brainParts.querySelector("#isolated-ventricles");
            ventriclesPos = ventricles.getAttribute("position");
            ventriclesRot = ventricles.getAttribute("rotation");
            ventriclesCol = ventricles.getAttribute("material").color
            thalamus = brainParts.querySelector("#isolated-Thalamus");
            thalamusPos = thalamus.getAttribute("position");
            thalamusRot = thalamus.getAttribute("rotation");
            thalamusCol = thalamus.getAttribute("material").color
            subthalamic = brainParts.querySelector("#isolated-Subthalamic");
            subthalamicPos = subthalamic.getAttribute("position");
            subthalamicRot = subthalamic.getAttribute("rotation");
            subthalamicCol = subthalamic.getAttribute("material").color
            lCaudate = brainParts.querySelector("#isolated-Lcaudate");
            lCaudatePos = lCaudate.getAttribute("position");
            lCaudateRot = lCaudate.getAttribute("rotation");
            lCaudateCol = lCaudate.getAttribute("material").color
            lPutamen = brainParts.querySelector("#isolated-Lputamen");
            lPutamenPos = lPutamen.getAttribute("position");
            lPutamenRot = lPutamen.getAttribute("rotation");
            lPutamenCol = lPutamen.getAttribute("material").color
            lSubstantiaNigra = brainParts.querySelector("#isolated-Lsubstantianigra");
            lSubstantiaNigraPos = lSubstantiaNigra.getAttribute("position");
            lSubstantiaNigraRot = lSubstantiaNigra.getAttribute("rotation");
            lSubstantiaNigraCol = lSubstantiaNigra.getAttribute("material").color;
            lGlobusPallidus = brainParts.querySelector("#isolated-Lglobuspallidus");
            lGlobusPallidusPos = lGlobusPallidus.getAttribute("position");
            lGlobusPallidusRot = lGlobusPallidus.getAttribute("rotation");
            lGlobusPallidusCol = lGlobusPallidus.getAttribute("material").color;
            rCaudate = brainParts.querySelector("#isolated-Rcaudate");
            rCaudatePos = rCaudate.getAttribute("position");
            rCaudateRot = rCaudate.getAttribute("rotation");
            lCaudateCol = lCaudate.getAttribute("material").color;
            rPutamen = brainParts.querySelector("#isolated-Rcaudate");
            rPutamenPos = rPutamen.getAttribute("position");
            rPutamenRot = rPutamen.getAttribute("rotation");
            rPutamenCol = rPutamen.getAttribute("material").color;
            rSubstantiaNigra = brainParts.querySelector("#isolated-Rsubstantianigra");
            rSubstantiaNigraPos = rSubstantiaNigra.getAttribute("position");
            rSubstantiaNigraRot = rSubstantiaNigra.getAttribute("rotation");
            rSubstantiaNigraCol = rSubstantiaNigra.getAttribute("material").color;
            rGlobusPallidus = brainParts.querySelector("#isolated-Rglobuspallidus");
            rGlobusPallidusPos = rGlobusPallidus.getAttribute("position");
            rGlobusPallidusRot = rGlobusPallidus.getAttribute("rotation");
            rGlobusPallidusCol = rGlobusPallidus.getAttribute("material").color;

            let brain, bgeneralPos, bgeneralRot, bventricles, bventriclesPos, bventriclesRot, bventriclesCol, bthalamus, bthalamusPos, bthalamusRot, bthalamusCol,
                bsubthalamic, bsubthalamicPos, bsubthalamicRot, bsubthalamicCol, blCaudate, blCaudatePos, blCaudateRot, blCaudateCol, blPutamen, blPutamenPos, 
                blPutamenRot, blPutamenCol, blSubstantiaNigra, blSubstantiaNigraPos, blSubstantiaNigraRot, blSubstantiaNigraCol, blGlobusPallidus, blGlobusPallidusPos,
                blGlobusPallidusRot, blGlobusPallidusCol, brCaudate, brCaudatePos, brCaudateRot, brCaudateCol, brPutamen, brPutamenPos, brPutamenRot, brPutamenCol,
                brSubstantiaNigra, brSubstantiaNigraPos, brSubstantiaNigraRot, brSubstantiaNigraCol, brGlobusPallidus, brGlobusPallidusPos, brGlobusPallidusRot, brGlobusPallidusCol;

            brain = document.querySelector("#holobrain");
            bgeneralPos = brain.getAttribute("position");
            bgeneralRot = brain.getAttribute("rotation");
            bventricles = brain.querySelector("#ventricles");
            bventriclesPos = bventricles.getAttribute("position");
            bventriclesRot = bventricles.getAttribute("rotation");
            bventriclesCol = bventricles.getAttribute("material").color
            bthalamus = brain.querySelector("#Thalamus");
            bthalamusPos = bthalamus.getAttribute("position");
            bthalamusRot = bthalamus.getAttribute("rotation");
            bthalamusCol = bthalamus.getAttribute("material").color
            bsubthalamic = brain.querySelector("#Subthalamic");
            bsubthalamicPos = bsubthalamic.getAttribute("position");
            bsubthalamicRot = bsubthalamic.getAttribute("rotation");
            bsubthalamicCol = bsubthalamic.getAttribute("material").color
            blCaudate = brain.querySelector("#Lcaudate");
            blCaudatePos = blCaudate.getAttribute("position");
            blCaudateRot = blCaudate.getAttribute("rotation");
            blCaudateCol = blCaudate.getAttribute("material").color
            blPutamen = brain.querySelector("#Lputamen");
            blPutamenPos = blPutamen.getAttribute("position");
            blPutamenRot = blPutamen.getAttribute("rotation");
            blPutamenCol = blPutamen.getAttribute("material").color
            blSubstantiaNigra = brain.querySelector("#Lsubstantianigra");
            blSubstantiaNigraPos = blSubstantiaNigra.getAttribute("position");
            blSubstantiaNigraRot = blSubstantiaNigra.getAttribute("rotation");
            blSubstantiaNigraCol = blSubstantiaNigra.getAttribute("material").color;
            blGlobusPallidus = brain.querySelector("#Lglobuspallidus");
            blGlobusPallidusPos = blGlobusPallidus.getAttribute("position");
            blGlobusPallidusRot = blGlobusPallidus.getAttribute("rotation");
            blGlobusPallidusCol = blGlobusPallidus.getAttribute("material").color;
            brCaudate = brain.querySelector("#Rcaudate");
            brCaudatePos = brCaudate.getAttribute("position");
            brCaudateRot = brCaudate.getAttribute("rotation");
            brCaudateCol = brCaudate.getAttribute("material").color;
            brPutamen = brain.querySelector("#Rputamen");
            brPutamenPos = brPutamen.getAttribute("position");
            brPutamenRot = brPutamen.getAttribute("rotation");
            brPutamenCol = brPutamen.getAttribute("material").color;
            brSubstantiaNigra = brain.querySelector("#Rsubstantianigra");
            brSubstantiaNigraPos = brSubstantiaNigra.getAttribute("position");
            brSubstantiaNigraRot = brSubstantiaNigra.getAttribute("rotation");
            brSubstantiaNigraCol = brSubstantiaNigra.getAttribute("material").color;
            brGlobusPallidus = brain.querySelector("#Rglobuspallidus");
            brGlobusPallidusPos = brGlobusPallidus.getAttribute("position");
            brGlobusPallidusRot = brGlobusPallidus.getAttribute("rotation");
            brGlobusPallidusCol = brGlobusPallidus.getAttribute("material").color;
            return {
                brainParts: {
                    general: {
                        pos: generalPos,
                        rot: generalRot
                    },
                    ventricles: {
                        pos: ventriclesPos,
                        rot: ventriclesRot,
                        col: ventriclesCol,
                    },
                    thalamus: {
                        pos: thalamusPos,
                        rot: thalamusRot,
                        col: thalamusCol,
                    },
                    subthalamic: {
                        pos: subthalamicPos,
                        rot: subthalamicRot,
                        col: subthalamicCol,
                    },
                    lCaudate: {
                        pos: lCaudatePos,
                        rot: lCaudateRot,
                        col: lCaudateCol,
                    },
                    lPutamen: {
                        pos: lPutamenPos,
                        rot: lPutamenRot,
                        col: lPutamenCol,
                    },
                    lSubstantiaNigra: {
                        pos: lSubstantiaNigraPos,
                        rot: lSubstantiaNigraRot,
                        col: lSubstantiaNigraCol,
                    },
                    lGlobusPallidus: {
                        pos: lGlobusPallidusPos,
                        rot: lGlobusPallidusRot,
                        col: lGlobusPallidusCol,
                    },
                    rCaudate: {
                        pos: rCaudatePos,
                        rot: rCaudateRot,
                        col: rCaudateCol,
                    },
                    rPutamen: {
                        pos: rPutamenPos,
                        rot: rPutamenRot,
                        col: rPutamenCol,
                    },
                    rSubstantiaNigra: {
                        pos: rSubstantiaNigraPos,
                        rot: rSubstantiaNigraRot,
                        col: rSubstantiaNigraCol,
                    },
                    rGlobusPallidus: {
                        pos: rGlobusPallidusPos,
                        rot: rGlobusPallidusRot, 
                        col: rGlobusPallidusCol,
                    } 
                },
                brain: {
                    general: {
                        pos: bgeneralPos,
                        rot: bgeneralRot
                    },
                    ventricles: {
                        pos: bventriclesPos,
                        rot: bventriclesRot,
                        col: bventriclesCol,
                    },
                    thalamus: {
                        pos: bthalamusPos,
                        rot: bthalamusRot,
                        col: bthalamusCol,
                    },
                    subthalamic: {
                        pos: bsubthalamicPos,
                        rot: bsubthalamicRot,
                        col: bsubthalamicCol,
                    },
                    lCaudate: {
                        pos: blCaudatePos,
                        rot: blCaudateRot,
                        col: blCaudateCol,
                    },
                    lPutamen: {
                        pos: blPutamenPos,
                        rot: blPutamenRot,
                        col: blPutamenCol,
                    },
                    lSubstantiaNigra: {
                        pos: blSubstantiaNigraPos,
                        rot: blSubstantiaNigraRot,
                        col: blSubstantiaNigraCol,
                    },
                    lGlobusPallidus: {
                        pos: blGlobusPallidusPos,
                        rot: blGlobusPallidusRot,
                        col: blGlobusPallidusCol,
                    },
                    rCaudate: {
                        pos: brCaudatePos,
                        rot: brCaudateRot,
                        col: brCaudateCol,
                    },
                    rPutamen: {
                        pos: brPutamenPos,
                        rot: brPutamenRot,
                        col: brPutamenCol,
                    },
                    rSubstantiaNigra: {
                        pos: brSubstantiaNigraPos,
                        rot: brSubstantiaNigraRot,
                        col: brSubstantiaNigraCol,
                    },
                    rGlobusPallidus: {
                        pos: brGlobusPallidusPos,
                        rot: brGlobusPallidusRot, 
                        col: brGlobusPallidusCol,
                    }
                }
            }
        }

        this.share = function () {
            setTimeout(function () {
                this.sendState().then(function () {
                    this.share();
                }.bind(this))
                    .catch(function () {
                        this.share();
                    }.bind(this));
            }.bind(this), 40);
        }

        var sessionRequest = new XMLHttpRequest();
        sessionRequest.open('PUT', '/teacher/createEducationalSession', true);
        sessionRequest.onload = function () {
            if (sessionRequest.status === 200) {
                console.log("created session, key: " + sessionRequest.response)
                this.sessionKey = sessionRequest.response;
                var stream;
                //session is created, connect to audio server
                var session = {
                    audio: true,
                    video: false
                };
                var onError = function(e) {
                    console.log(e);
                }
                var initializeRecorder = function(mediaStream) {
                    var audioContext = window.AudioContext;
                    var context = new audioContext();
                    var audioInput = context.createMediaStreamSource(mediaStream);
                    var bufferSize = 2048;
                    var recorder = context.createScriptProcessor(bufferSize, 1, 1);
                    recorder.onaudioprocess = recorderProcess;
                    audioInput.connect(recorder);
                    recorder.connect(context.destination);
                }
                var recordRTC = null;

                var recorderProcess = function(e) {
                    var left = e.inputBuffer.getChannelData(0);
                    stream.write(left);
                }
                
                require(["js/socket.io-stream.js"], function(ss) {
                    stream = ss.createStream();
                    var socket = io(window.location.origin + '/' + this.sessionKey);
                    ss(socket).emit('audio', stream)
                    navigator.mediaDevices.getUserMedia(session).then(initializeRecorder).catch(onError);
                    this.share();
                }.bind(this));
            }
        }.bind(this);
        sessionRequest.setRequestHeader('Content-Type', 'application/json');
        sessionRequest.send(JSON.stringify(this.readState()));
    }
});