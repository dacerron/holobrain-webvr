AFRAME.registerComponent('show-mri', {
  
  schema: {
    target: {type: 'selector', default: '#brainStuff'},
    visible: {type: 'bool', default: 'true'},
  },
   
init:function() {
    var el = this.el;
    var data = this.data;
    this.visible = data.target.getAttribute("visible")
    this.el.addEventListener('click', function (evt) {  
      let isVisible = el.getAttribute('show-mri').visible;
      if (isVisible) { 
        el.setAttribute('show-mri', 'visible: false');
        data.target.setAttribute("visible", false);
      } else {
        el.setAttribute('show-mri', 'visible: true');
        data.target.setAttribute("visible", true);
      }
    })
  }
});
