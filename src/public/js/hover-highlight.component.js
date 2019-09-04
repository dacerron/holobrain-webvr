AFRAME.registerComponent('hover-highlight', {
    schema: {
        counterpart: {type: "selector", default: ""},
        highlighted: {type: "boolean", default: false}
    },

    //REQUIREMENT: counterpart has the same starting color as el
    init: function () {
        var data = this.data;
        var el = this.el;
        var ogColor = el.getAttribute("gltf-color").current;

        el.addEventListener('mouseenter', function (e) {
            el.setAttribute('gltf-color', {current: "#ffffff"});
            el.setAttribute('hover-highlight', {highlighted: true})
            data.counterpart ? data.counterpart.setAttribute('gltf-color', {current: "#ffffff"}) : null;
        });

        el.addEventListener('mouseleave', function (e) {
            el.setAttribute('gltf-color', {current: ogColor});
            el.setAttribute('hover-highlight', {highlighted: false})
            data.counterpart ? data.counterpart.setAttribute('gltf-color', {current: ogColor}) : null;
        });
    },
});