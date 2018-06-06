AFRAME.registerComponent('expand-brain', {
  
  schema: {
    target: {type: 'selector', default: '#brain-parts'},
    center: {type: 'selector', default: '#brain-cortex'},
    expanded: {type: 'bool', default: 'false'},
    expand: {type: 'bool', default: 'true'}
  },
   
  init:function() {
    var el = this.el;
    var data = this.data;
    
    this.el.addEventListener('click', function (evt) {
      let expanded = el.getAttribute("expand-brain").expanded;
      let expand = el.getAttribute("expand-brain").expand;
      if (expanded == false && expand == true) {
        let brainCenter = data.center.getAttribute("position");
        let brainParts = data.target.children;
        let numBrainParts = brainParts.length;
        for (let i = 0; i < numBrainParts; i++) {
          let brainPart = brainParts[i];
          let oldBrainPos = brainPart.getAttribute("position");
          let brainPos = Object.assign({}, oldBrainPos);
          let xDir = brainPos.x - brainCenter.x;
          let yDir = brainPos.y- brainCenter.y;
          let zDir = brainPos.z - brainCenter.z;
          brainPos.x += xDir * 5;
          brainPos.y += yDir * 5;
          brainPos.z += zDir * 5;
          
          
          let oldBrainPosString = oldBrainPos.x + " " + oldBrainPos.y + " " + oldBrainPos.z;
          let brainPosString = brainPos.x + " " + brainPos.y + " " + brainPos.z;
          
          brainPart.setAttribute("animation__pos", "property: position; dur: 600; easing: linear; from: " + oldBrainPosString + "; to: " + brainPosString + ";");
          //brainPart.setAttribute("position", brainPos);
        }
        document.querySelectorAll('[expand-brain]').forEach( function(x) { x.setAttribute("expand-brain", "expanded: true")});
      }
      else if (expanded == true && expand == false) {
        let brainCenter = data.center.getAttribute("position");
        let brainParts = data.target.children;
        let numBrainParts = brainParts.length;
        for (let i = 0; i < numBrainParts; i++) {
          let brainPart = brainParts[i];
          let oldBrainPos = brainPart.getAttribute("position");
          let brainPos = Object.assign({}, oldBrainPos);
          let xDir = brainPos.x - brainCenter.x;
          let yDir = brainPos.y - brainCenter.y;
          let zDir = brainPos.z - brainCenter.z;
          brainPos.x -= xDir * 5/6;
          brainPos.y -= yDir * 5/6;
          brainPos.z -= zDir * 5/6;
          
          let oldBrainPosString = oldBrainPos.x + " " + oldBrainPos.y + " " + oldBrainPos.z;
          let brainPosString = brainPos.x + " " + brainPos.y + " " + brainPos.z;
          
          brainPart.setAttribute("animation__pos", "property: position; dur: 600; easing: linear; from: " + oldBrainPosString + "; to: " + brainPosString + ";");
          //brainPart.setAttribute("position", brainPos);
        }
         document.querySelectorAll('[expand-brain]').forEach( function(x) { x.setAttribute("expand-brain", "expanded: false")});
        
      }
    });
  }, 

});
