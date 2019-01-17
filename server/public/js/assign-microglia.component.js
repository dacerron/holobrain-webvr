AFRAME.registerComponent('assign-microglia', {
  
  schema: {
    target: {type: 'selector', default: '#braincells'},
    target2: {type: 'selector', default: '#Channel1'},
    target3: {type: 'selector', default: '#Channel2'},
    target4: {type: 'selectorAll', default: '.microgliaButtons'},
    target5: {type: 'selectorAll', default: '.cellButtons'},
    visible: {type: 'bool', default: 'false'},
  },
   
init:function() {
    var el = this.el;
    var data = this.data;
    var slideContainer = data.target;
    this.el.addEventListener('click', function (evt) {
      let idx = slideContainer.getAttribute("slide-container").index
      if (idx >= 0) { 
        slideContainer.setAttribute('slide-container', {index: -1});
        data.target2.setAttribute("visible", true);
        data.target3.setAttribute("visible", true);
        for (var i = 0; i < data.target4.length; i++) {
          data.target4[i].setAttribute("visible", false);
        }
        for (var i = 0; i < data.target5.length; i++) {
          data.target5[i].setAttribute("visible", true);
        }
      } else {
        slideContainer.setAttribute('slide-container', {index: 0});
        data.target2.setAttribute("visible", false);
        data.target3.setAttribute("visible", false);
        
        for (var i = 0; i < data.target4.length; i++) {
          data.target4[i].setAttribute("visible", true);
        }
        for (var i = 0; i < data.target5.length; i++) {
          data.target5[i].setAttribute("visible", false);
        }
      }
    })
  }
});
