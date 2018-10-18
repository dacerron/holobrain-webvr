AFRAME.registerComponent('expand-position', {
    schema: {
        pos: {type: 'vec3'}
    },
    init: function() {
        console.log("initiated expand-position");
    }
});