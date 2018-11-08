AFRAME.registerComponent('hover-highlight', {
    schema: {
      counterpart: {type: "selector", default: ""}
    },

    //REQUIREMENT: counterpart has the same starting color as el
    init: function () {
      var data = this.data;
      var el = this.el;
      var ogColor = el.getAttribute("material").color

      el.addEventListener('mouseenter', function (e) {
        el.setAttribute('material', {color: "#ffffff"});
        data.counterpart? data.counterpart.setAttribute('material', {color: "#ffffff"}): null;
      });

      el.addEventListener('mouseleave', function (e) {
        el.setAttribute('material', {color: ogColor});
        data.counterpart? data.counterpart.setAttribute('material', {color: ogColor}): null;
      });
    }
  });