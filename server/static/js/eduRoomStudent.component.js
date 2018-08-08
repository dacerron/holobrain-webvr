AFRAME.registerComponent("eduroomstudent", {
    schema: { type: 'vec3' },

    init: function () {
        this.sessionKey = Number.parseInt(CookieParser.grabCookie("session"));

        //TODO: extend this function with ActiveXML and others if we want to support more browsers
        this.makeXHR = function () {
            return new XMLHttpRequest();
        };

        this.fetchState = function () {
            return new Promise(function (resolve, reject) {
                var req = this.makeXHR();
                req.open('GET', '/student/getEducationalState?key=' + this.sessionKey);
                req.onload = function () {
                    if (req.status === 200) {
                        this.setState(JSON.parse(req.response));
                        resolve();
                    } else {
                        console.log("failed to update state");
                        reject();
                    }
                }.bind(this);
                req.send();
            }.bind(this));
        };

        this.setState = function (state) {
            let brainParts, ventricles, thalamus, subthalamic, lCaudate, lPutamen, lSubstantiaNigra,
                lGlobusPallidus, rCaudate, rPutamen, rGlobusPallidus;
            state = state.state;
            brainParts = document.querySelector("#isolated-brain-parts");
            brainParts.setAttribute("position", state.brainParts.general.pos);
            brainParts.setAttribute("rotation", state.brainParts.general.rot);

            ventricles = brainParts.querySelector("#isolated-ventricles");
            this.updateObject(ventricles, state.brainParts.ventricles);

            thalamus = brainParts.querySelector("#isolated-Thalamus");
            this.updateObject(thalamus, state.brainParts.thalamus);

            subthalamic = brainParts.querySelector("#isolated-Subthalamic");
            this.updateObject(subthalamic, state.brainParts.subthalamic);

            lCaudate = brainParts.querySelector("#isolated-Lcaudate");
            this.updateObject(lCaudate, state.brainParts.lCaudate);

            lPutamen = brainParts.querySelector("#isolated-Lputamen");
            this.updateObject(lPutamen, state.brainParts.lPutamen);

            lSubstantiaNigra = brainParts.querySelector("#isolated-Lsubstantianigra");
            this.updateObject(lSubstantiaNigra, state.brainParts.lSubstantiaNigra);

            lGlobusPallidus = brainParts.querySelector("#isolated-Lglobuspallidus");
            this.updateObject(lGlobusPallidus, state.brainParts.lGlobusPallidus);

            rCaudate = brainParts.querySelector("#isolated-Rcaudate");
            this.updateObject(rCaudate, state.brainParts.lGlobusPallidus);

            rPutamen = brainParts.querySelector("#isolated-Rcaudate");
            this.updateObject(rPutamen, state.brainParts.rPutamen);

            rSubstantiaNigra = brainParts.querySelector("#isolated-Rsubstantianigra");
            this.updateObject(rSubstantiaNigra, state.brainParts.rSubstantiaNigra);

            rGlobusPallidus = brainParts.querySelector("#isolated-Rglobuspallidus");
            this.updateObject(rGlobusPallidus, state.brainParts);

            brainParts = document.querySelector("#holobrain");
            brainParts.setAttribute("position", state.brain.general.pos);
            brainParts.setAttribute("rotation", state.brain.general.rot);

            ventricles = brainParts.querySelector("#ventricles");
            this.updateObject(ventricles, state.brain.ventricles);

            thalamus = brainParts.querySelector("#Thalamus");
            this.updateObject(thalamus, state.brain.thalamus);

            subthalamic = brainParts.querySelector("#Subthalamic");
            this.updateObject(subthalamic, state.brain.subthalamic);

            lCaudate = brainParts.querySelector("#Lcaudate");
            this.updateObject(lCaudate, state.brain.lCaudate);

            lPutamen = brainParts.querySelector("#Lputamen");
            this.updateObject(lPutamen, state.brain.lPutamen);

            lSubstantiaNigra = brainParts.querySelector("#Lsubstantianigra");
            this.updateObject(lSubstantiaNigra, state.brain.lSubstantiaNigra);

            lGlobusPallidus = brainParts.querySelector("#Lglobuspallidus");
            this.updateObject(lGlobusPallidus, state.brain.lGlobusPallidus);

            rCaudate = brainParts.querySelector("#Rcaudate");
            this.updateObject(rCaudate, state.brain.rCaudate);

            rPutamen = brainParts.querySelector("#Rputamen");
            this.updateObject(rPutamen, state.brain.rPutamen);

            rSubstantiaNigra = brainParts.querySelector("#Rsubstantianigra");
            this.updateObject(rSubstantiaNigra, state.brain.rSubstantiaNigra);

            rGlobusPallidus = brainParts.querySelector("#Rglobuspallidus");
            this.updateObject(rGlobusPallidus, state.brain.rGlobusPallidus);
        }

        this.updateObject = function(obj, state) {
            obj.setAttribute("position", state.pos); 
            obj.setAttribute("rotation", state.rot);
            obj.setAttribute("material", {color: state.col});
        }

        this.share = function () {
            setTimeout(function () {
                this.fetchState()
                    .then(function () {
                        this.share();
                    }.bind(this))
                    .catch(function () {
                        this.share();
                    }.bind(this));
            }.bind(this), 40);
        };
        
        var stream;
        //session is created, connect to audio server

        function initializePlayer(audioStream) {
            var audioCtx = new AudioContext();
            var audioBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 3, audioCtx.sampleRate);
            audioStream.on('data', function(data) {
                console.log('data');
                audioBuffer.copyToChannel(data, 0);
            });
            var source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();
        }
               
        stream = ss.createStream();
        initializePlayer(stream);
        var socket = io(window.location.origin + '/' + this.sessionKey);
        ss(socket).emit('join', stream);
        this.share();
    }
});