AFRAME.registerComponent('toggle-structure', {
    schema: {
        target: { type: 'string', default: '' }
    },

    init: function () {
        this.el.addEventListener('click', function () {
            let targets = document.querySelectorAll(this.data.target);
            if (targets) {
                targets.forEach((e) => {
                    e.getAttribute("visible") ? e.setAttribute("visible", false) : e.setAttribute("visible", true);
                });
            }
        }.bind(this));
    }
})