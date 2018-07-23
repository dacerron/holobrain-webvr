AFRAME.registerComponent("eduroomstudent", {
    schema: { type: 'vec3' },

    init: function () {
        this.sessionKey = 62117;
        console.log("init eduRoomStudent component");

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
                        console.log("got state, key: " + req.response);
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
            brainParts.setAttribute("position", state.general.pos);
            brainParts.setAttribute("rotation", state.general.rot);
            ventricles = brainParts.querySelector("#isolated-ventricles");
            ventricles.setAttribute("position", state.ventricles.pos);
            ventricles.setAttribute("rotation", state.ventricles.rot);
            thalamus = brainParts.querySelector("#isolated-Thalamus");
            thalamus.setAttribute("position", state.thalamus.pos);
            thalamus.setAttribute("rotation", state.thalamus.rot);
            subthalamic = brainParts.querySelector("#isolated-Subthalamic");
            subthalamic.setAttribute("position", state.subthalamic.pos);
            subthalamic.setAttribute("rotation", state.subthalamic.rot);
            lCaudate = brainParts.querySelector("#isolated-Lcaudate");
            lCaudate.setAttribute("position", state.lCaudate.pos);
            lCaudate.setAttribute("rotation", state.lCaudate.rot);
            lPutamen = brainParts.querySelector("#isolated-Lputamen");
            lPutamen.setAttribute("position", state.lPutamen.pos);
            lPutamen.setAttribute("rotation", state.lPutamen.rot);
            lSubstantiaNigra = brainParts.querySelector("#isolated-Lsubstantianigra");
            lSubstantiaNigra.setAttribute("position", state.lSubstantiaNigra.pos);
            lSubstantiaNigra.setAttribute("rotation", state.lSubstantiaNigra.rot);
            lGlobusPallidus = brainParts.querySelector("#isolated-Lglobuspallidus");
            lGlobusPallidus.setAttribute("position", state.lGlobusPallidus.pos);
            lGlobusPallidus.setAttribute("rotation", state.lGlobusPallidus.rot);
            rCaudate = brainParts.querySelector("#isolated-Rcaudate");
            rCaudate.setAttribute("position", state.rCaudate.pos);
            rCaudate.setAttribute("rotation", state.rCaudate.rot);
            rPutamen = brainParts.querySelector("#isolated-Rcaudate");
            rPutamen.setAttribute("position", state.rPutamen.pos);
            rPutamen.setAttribute("rotation", state.rPutamen.rot);
            rSubstantiaNigra = brainParts.querySelector("#isolated-Rsubstantianigra");
            rSubstantiaNigra.setAttribute("position", state.rSubstantiaNigra.pos);
            rSubstantiaNigra.setAttribute("rotation", state.rSubstantiaNigra.rot);
            rGlobusPallidus = brainParts.querySelector("#isolated-Rglobuspallidus");
            rGlobusPallidus.setAttribute("position", state.rGlobusPallidus.pos);
            rGlobusPallidus.setAttribute("rotation", state.rGlobusPallidus.rot);
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

        this.share();
    }
});