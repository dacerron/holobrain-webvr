AFRAME.registerComponent('scale-cells', {
  
  schema: {
    scale: {type: 'number', default: '1'}, 
    target: {type: 'selector', default: '#braincells'},
    increase: {type: 'bool', default: 'true'}
  },
   
  init:function() {
    var el = this.el;
    var data = this.data;
    
    this.el.addEventListener('click', function (evt) {
      let scale = el.getAttribute('scale-cells').scale;
      let up = el.getAttribute('scale-cells').increase;
      let scaleModifier = 0.5;
      if (up == true) {
        scaleModifier = 2;
      } 
      if (scale != scaleModifier) {
        
        scale *= scaleModifier;
        let oldCurrentScale = data.target.getAttribute("scale");
        let currentScale = Object.assign({}, oldCurrentScale);

        currentScale.x *= scaleModifier; 
        currentScale.y *= scaleModifier; 
        currentScale.z *= scaleModifier; 
        
        let oldCurrentScaleString = oldCurrentScale.x + " " + oldCurrentScale.y + " " + oldCurrentScale.z;
        let currentScaleString = currentScale.x + " " + currentScale.y + " " + currentScale.z;
        data.target.setAttribute("animation__scale", "property: scale; dur: 600; easing: linear; from: " + oldCurrentScaleString + "; to: " + currentScaleString + "; autoplay: true; loop: false;");
        document.querySelectorAll('[scale-cells]').forEach(function (x) {x.setAttribute('scale-cells', 'scale: ' + scale)});
      } 
      
    });
  }, 

});