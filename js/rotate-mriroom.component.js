AFRAME.registerComponent('rotate-mriroom', {
  
  schema: {
    target: {type: 'selector', default: '.room'},
    paused: {type: 'bool', default: 'true'},
  },
  
  init:function() {
    var el = this.el;
    var data = this.data;
    this.paused = false;
    this.paused2 = false;
    this.el.addEventListener('click', function (evt) {
      let isPaused = el.getAttribute('rotate-mriroom').paused;
      if (isPaused) {
        el.setAttribute('rotate-mriroom', 'paused: false');
        data.target.emit("rotate-resume");
      } else {
        el.setAttribute('rotate-mriroom', 'paused: true');
        data.target.emit("rotate-pause");
      }
    });
  }, 

});
