AFRAME.registerComponent('rotate-on-click', {

  
  init:function() {
     
     var el = this.el;
     this.isRotating = false;
     this.el.addEventListener('click', function (evt) {
      
     });
  }, 
  
  tick: function() {
    let currentRotation = this.el.getAttribute("rotation");
    currentRotation.y = currentRotation.y + 1;
    this.el.setAttribute("rotation", currentRotation);
  }
  
});