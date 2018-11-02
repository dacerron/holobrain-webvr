AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'green'},
      counterpart: {type: 'selector', default: ''}
    },

    init: function () {
      var data = this.data;
      var el = this.el;
      var defaultColor = '#c2d2ea';

      el.addEventListener('mouseenter', function (e) {
        el.setAttribute('material', {color: data.color});
        if(data.counterpart) {
          data.counterpart.setAttribute('material', {color: data.color});
        }
      });

      el.addEventListener('mouseleave', function (e) {
        el.setAttribute('material', {color: defaultColor});
        if(data.counterpart) {
          data.counterpart.setAttribute('material', {color: defaultColor});
        }
      });
    }
  });