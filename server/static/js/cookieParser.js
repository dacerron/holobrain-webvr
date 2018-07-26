var CookieParser = (function() {
    var grabCookie = (c) => {
        let cookies = separateCookies(document.cookie);
        return cookies[c];
    }

    var hasCookie = (c) => {
        let cookies = separateCookies(document.cookie);
        return hasOwnProperty(cookies, c);
    }

    //cookie format: name1=val1;name2=val2;name3=val3
    var separateCookies = (cookies) => {
        let obj = {};
        cookieArr = cookies.split(";");
        for (let cookie of cookieArr) {
            let c = cookie.split("=");
            let name = c[0].replace(/\s/g, '');
            let val = c[1].replace(/\s/g, '');
            obj[name] = val;
        }

        return obj;
    }

    return {
        grabCookie,
        hasCookie,
    }
})();