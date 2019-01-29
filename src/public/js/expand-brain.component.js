AFRAME.registerComponent('expand-brain', {
  
  schema: {
    target: {type: 'string', default: '#cortex'},
    center: {type: 'string', default: '#cortex'},
    expanded: {type: 'bool', default: 'false'},
    expand: {type: 'bool', default: 'true'}
  },
   
  init:function() {
    
    this.el.addEventListener('click', function (evt) {
      let data = this.data
      let el = this.el;
      let brainParts = document.querySelector(data.target).children;
      let numBrainParts = brainParts.length;
      let expanded = el.getAttribute("expand-brain").expanded;
      let expand = el.getAttribute("expand-brain").expand;
      if (expanded === false && expand === true) {
        console.log('expanding');

        document.querySelector(data.center).setAttribute("model-opacity", "0.0");
        for (let i = 0; i < numBrainParts; i++) {
          let brainPart = brainParts[i];
          let oldBrainPos = brainPart.getAttribute("position");
          let disappear = brainPart.getAttribute("expand-position").disappear;
          let brainPos =  brainPart.getAttribute("expand-position").pos
          
          let oldBrainPosString = oldBrainPos.x + " " + oldBrainPos.y + " " + oldBrainPos.z;
          let brainPosString = brainPos.x + " " + brainPos.y + " " + brainPos.z;
          
          brainPart.setAttribute("animation__pos", "property: position; dur: 600; easing: linear; from: " + oldBrainPosString + "; to: " + brainPosString + ";");
          disappear? function(){brainPart.setAttribute("visible", false)}() : null;
        }
        document.querySelectorAll('[expand-brain]').forEach( function(x) { x.setAttribute("expand-brain", "expanded: true")});
      }
      else if (expanded == true && expand == false) {
        console.log('collapsing');
        let brainParts = document.querySelector(data.target).children;
        let numBrainParts = brainParts.length;
        for (let i = 0; i < numBrainParts; i++) {
          let brainPart = brainParts[i];
          let oldBrainPos = brainPart.getAttribute("position");
          let brainPos = brainPart.getAttribute("og-position").pos;
          let disappear = brainPart.getAttribute("expand-position").disappear;
          
          let oldBrainPosString = oldBrainPos.x + " " + oldBrainPos.y + " " + oldBrainPos.z;
          let brainPosString = brainPos.x + " " + brainPos.y + " " + brainPos.z;
          
          brainPart.setAttribute("animation__pos", "property: position; dur: 600; easing: linear; from: " + oldBrainPosString + "; to: " + brainPosString + ";");
          disappear? function(){brainPart.setAttribute("visible", true)}() : null;
        }
        document.querySelector(data.center).setAttribute("model-opacity", "0.5");
        document.querySelectorAll('[expand-brain]').forEach( function(x) { x.setAttribute("expand-brain", "expanded: false")});
        
      }
    }.bind(this));
  }, 

});
