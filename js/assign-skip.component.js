AFRAME.registerComponent('assign-skip', {

  schema:{
    container: {type: "selector"},
    back: {type: 'bool', default: 'true'},
    skip: {type: 'int', default: 1}
  },

  
  init:function() {
    var el = this.el;
    var data = this.data;
    
    el.addEventListener('click', function (evt) {
      let getIndex = data.container.getAttribute("slide-container").index
      let skipBack = el.getAttribute("assign-skip").back;
      let len = data.container.getAttribute("slide-container").length
      if (skipBack) {
        getIndex = (getIndex + data.skip) % len;
      } else {
        getIndex = (getIndex - data.skip) % len;
        if(getIndex < 0) {
          getIndex += len;
        }
      }
      data.container.setAttribute("slide-container", "index:" + getIndex);
    })
  },
})
