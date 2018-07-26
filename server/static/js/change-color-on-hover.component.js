AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'green'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;
      var defaultColor = '#c2d2ea';

      el.addEventListener('mouseenter', function (e) {
        console.log("enter");
        el.setAttribute('material', {color: data.color});
      });

      el.addEventListener('mouseleave', function (e) {
        console.log("leave");
        el.setAttribute('material', {color: defaultColor});
      });
    }
  });