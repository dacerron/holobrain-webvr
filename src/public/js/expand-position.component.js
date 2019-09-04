AFRAME.registerComponent('expand-position', {
    schema: {
        pos: {type: 'vec3'},
        disappear: {type: 'boolean'},
    },
    init: function() {
        console.log("initiated expand-position");
    }
});