AFRAME.registerComponent('assign-channel', {
  
  schema: {
    channel: {type: 'selector'},
  },
   
  init: function() {
    var el = this.el;
    el.addEventListener("click", function(evt) {
      let channel = el.getAttribute("assign-channel").channel;
      let visible = channel.getAttribute("visible")
      channel.setAttribute("visible", !!!visible);
    });
  }
})