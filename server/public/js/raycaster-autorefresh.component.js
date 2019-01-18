/*
*  Refreshes the raycasters for all cursors in the scene 
   on listed events : opendropdown, closedropdown
*/

AFRAME.registerComponent('raycaster-autorefresh', {
  init: function () {
    var el = this.el;
    this.el.addEventListener('opendropdown', function () {
      console.log("refresh raycast");
      var cursorEl = el.querySelector('[cursor]');
      cursorEl.components.raycaster.refreshObjects();
    });
    this.el.addEventListener('closedropdown', function() {
      console.log("refresh raycast");
      var cursorEl = el.querySelector('[cursor]');
      cursorEl.components.raycaster.refreshObjects();
    })
  }
});