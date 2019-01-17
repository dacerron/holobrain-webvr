AFRAME.registerComponent('hover-highlight', {
    schema: {
      counterpart: {type: "selector", default: ""}
    },

    //REQUIREMENT: counterpart has the same starting color as el
    init: function () {
      var data = this.data;
      var el = this.el;
      var ogColor = el.getAttribute("gltf-color").current;

      el.addEventListener('mouseenter', function (e) {
        el.setAttribute('gltf-color', {current: "#ffffff"});
        data.counterpart? data.counterpart.setAttribute('gltf-color', {current: "#ffffff"}): null;
      });

      el.addEventListener('mouseleave', function (e) {
        el.setAttribute('gltf-color', {current: ogColor});
        data.counterpart? data.counterpart.setAttribute('gltf-color', {current: ogColor}): null;
      });
    }
  });