AFRAME.registerComponent('assign-rotate', {
  
  schema: {
    target: {type: 'selector', default: '#cortex'},
    paused: {type: 'bool', default: 'true'}
  },
  
  init:function() {
    var el = this.el;
    var data = this.data;
    this.paused = false;
    this.el.addEventListener('click', function (evt) {
      let isPaused = el.getAttribute('assign-rotate').paused;
      if (isPaused) {
        el.setAttribute('assign-rotate', 'paused: false');
        data.target.emit("rotate-resume");
        //document.querySelectorAll('[animation__rot]').forEach(function (x) { x.emit("rotate-resume")});
      } else {
        el.setAttribute('assign-rotate', 'paused: true');
        data.target.emit("rotate-pause");
        //document.querySelectorAll('[animation__rot]').forEach(function (x) { x.emit("rotate-pause")});
      }
    });
  }, 

});
