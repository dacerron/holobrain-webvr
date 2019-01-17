var Index = (function() {

    var init = () => {
        let links = document.querySelectorAll(".link");
        for(let link of links) {
            link.addEventListener("click", (e) => {
                if(e.target.classList.contains("student")) {
                    document.cookie = "session=" + e.target.parentElement.querySelector(".session-key").value;
                }
                window.location.href = e.target.getAttribute("value");
            });
        }
    }
    return {
        init,
    }
})();

function ready(cb) {
    //document already rendered
    if(document.readyState != 'loading') cb();
    //modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', cb);
    //IE <= 8
    else document.attachEvent('onreadystatechange', function() {
        if(document.readyState === 'complete') cb();
    });
}

ready(Index.init);