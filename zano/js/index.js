"use strict";
// javascript
/* --- 80 cols -------------------------------------------------------------- */
fetch("/codex.json")
    .then(response => response.json())
    .then(data => data.slice(1, data.length - 1))
    .then(data => data.filter(x => x.match(/\d{3}/g)))
    .then(data => data.map(x => (/\d{3}/g).exec(x)[0]))
    .then(
        data => {
            const first = data[0];
            const last = data[data.length - 1];
            document.getElementById("newest").href
                = "/codex/codex" + first + ".html";
            document.getElementById("oldest").href
                = "/codex/codex" + last + ".html";
        }
    );