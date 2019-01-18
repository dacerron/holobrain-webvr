AFRAME.registerComponent('toggle-structure', {
    schema: {
        target: { type: 'selectorAll', default: '' }
    },

    init: function () {
        this.el.addEventListener('click', function () {
            let target = this.data.target
            if (target) {
                console.log(target);
                target.forEach((e) => {
                    e.getAttribute("visible") ? e.setAttribute("visible", false) : e.setAttribute("visible", true);
                });
            }
        }.bind(this));
    }
})