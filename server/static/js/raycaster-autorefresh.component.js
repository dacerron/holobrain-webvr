/*
*  Refreshes the raycasters for all cursors in the scene 
*  whenever a 3D model is loaded.
*/

AFRAME.registerComponent('raycaster-autorefresh', {
  init: function () {
    var el = this.el;
    this.el.addEventListener('model-loaded', function () {
      var cursorEl = el.querySelector('[cursor]');
      cursorEl.components.raycaster.refreshObjects();
      var overrideMat = el.querySelector('[override-material]');
      overrideMat.components["override-material"].update();
    });
  }
});