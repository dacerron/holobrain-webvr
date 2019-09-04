AFRAME.registerComponent('rotate-mri', {
  
  schema: {
    target: {type: 'selector', default: '#brainStuff'},
    paused: {type: 'bool', default: 'true'},
  },
  
  init:function() {
    var el = this.el;
    var data = this.data;
    this.paused = false;
    this.paused2 = false;
    this.el.addEventListener('click', function (evt) {
      let isPaused = el.getAttribute('rotate-mri').paused;
      if (isPaused) {
        el.setAttribute('rotate-mri', 'paused: false');
        data.target.emit("rotate-resume");
      } else {
        el.setAttribute('rotate-mri', 'paused: true');
        data.target.emit("rotate-pause");
      }
    });
  }, 

});