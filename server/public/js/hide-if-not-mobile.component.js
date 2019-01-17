/*
*  Removes the entity this component is attached to 
*  if the project is not being viewed on a mobile device.
*/

AFRAME.registerComponent('hide-if-not-mobile', {
  
   init:function() {
     
     if (!(AFRAME.utils.device.isMobile())) {
       let entityEl = this.el;
       entityEl.parentNode.removeChild(entityEl);
     }
  }
  
});