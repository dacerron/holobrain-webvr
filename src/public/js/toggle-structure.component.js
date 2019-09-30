AFRAME.registerComponent('toggle-structure', {
    schema: {
        target: { type: 'string', default: '' }
    },

    init: function () {
        var el = this.el; // must specify that this.el is selected button - may lost reference in the foreach
        var data = this.data;
        this.el.addEventListener('click', function () {
            let targets = document.querySelectorAll(data.target); // finds the a-entity with the id of "target" string
            if (targets) {
                targets.forEach((e) => {
                    e.getAttribute("visible") ? e.setAttribute("visible", false) : e.setAttribute("visible", true);
                    e.getAttribute("visible") ? el.setAttribute("background-color", e.getAttribute("gltf-color").current) : el.setAttribute("background-color", "#000000");
                    // must use setAttribute("background-color") for a-gui entity because not using HTML style (NOT using this.el.backgroundColor beucase using HTML style)
                    // must access gltf-color and not gltfColor from structure-manager because the structure-manager contains all data of all strucutres
                });
            }
        }.bind(this));
    }
  });